<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Models\UserAnalytics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FastwayController extends Controller
{
    private $user_analytics;
    private $fastway_provider;

    public function __construct()
    {
        $this->user_analytics = new UserAnalytics();
    }

    public function track_parcel(Request $request)
    {
        Validator::make($request->all(), [
            'trackingNumber' => ['required'],
        ])->validate();
        $response = fetch(env('FASTWAY_API_BASE_URL').'latest/tracktrace/render/'.$request->trackingNumber.'?api_key='.env('FASTWAY_API_KEY'));
        if ($response->hasJsonContent()) {
            return Inertia::render('track-details', [
                'title' => $request->trackingNumber,
                'trackingNumber' => $request->trackingNumber,
                'body' => "<div class='m-auto'>Invalid tracking number, <a href='/track' class='text-[#BA0C2F]'>go back</a></div>",
            ]);
        }
        $this->user_analytics->track_tracked($request->user()->id);

        return Inertia::render('track-details', [
            'title' => $request->trackingNumber,
            'trackingNumber' => $request->trackingNumber,
            'body' => $response->text(),
        ]);
    }

    public function generate(Request $request)
    {
        Validator::make($request->all(), [
            'destination' => 'required',
            'destination_2' => 'required',
            'postal_code' => 'required',
            'weight' => 'required',
            'dimensions_x' => 'required',
            'dimensions_y' => 'required',
            'dimensions_z' => 'required',
        ])->validate();
        $response = fetch(env('FASTWAY_API_BASE_URL').'latest/psc/lookup/'.$request->destination.'/'.$request->destination_2.'/'.$request->postal_code.'?WidthInCm='.$request->dimensions_x.'&LengthInCm='.$request->dimensions_y.'&HeightInCm='.$request->dimensions_z.'&WeightInKg='.$request->weight.'&api_key='.env('FASTWAY_API_KEY'));
        $user = $request->user();
        $this->user_analytics->track_quote($user->id);
        $data = $response->json();
        Quote::create([
            'user_id' => $user->id,
            'data' => $data,
        ]);

        return Inertia::render('generated-quote', [
            'title' => 'Generated quote',
            'body' => json_encode($data),
        ]);
    }

    public function get_old_quotes(Request $request)
    {
        $perPage = 10;
        $page = $request?->page ?? 1;

        $user = $request->user();
        $quotes = Quote::where('user_id', $user->id)->orderByDesc('id')->select('id', 'created_at')->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('old-quotes', [
            'quotes' => $quotes,
        ]);
    }

    public function view_old_quote(Request $request)
    {
        Validator::make($request->all(), [
            'id' => ['required', 'exists:quotes'],
        ])->validate();
        $user = $request->user();
        $q = Quote::where('user_id', $user->id)->where('id', $request->id)->first();
        if (!$q) {
            return abort(500);
        }

        return Inertia::render('old-quote', [
            'title' => $q->id,
            'body' => json_encode($q->data),
        ]);
    }
}
