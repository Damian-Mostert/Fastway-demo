<?php

namespace App\Http\Controllers;

use App\Models\UserAnalytics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController extends Controller
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

    public function generate_quote(Request $request)
    {
        Validator::make($request->all(), [
            'destination' => 'required',
            'postal_code' => 'required',
            'weight' => 'required',
            'dimensions_x' => 'required',
            'dimensions_y' => 'required',
            'dimensions_z' => 'required',
        ])->validate();
        $response = fetch(env('FASTWAY_API_BASE_URL').'latest/tracktrace/render/'.$request->trackingNumber.'?api_key='.env('FASTWAY_API_KEY'));
        if ($response->hasJsonContent()) {
            return Inertia::render('generated-quote', [
                'title' => 'Error generating quote',
                'body' => "<div class='m-auto'>Could not generate a quote, <a href='/track' class='text-[#BA0C2F]'>go back</a></div>",
            ]);
        }
        $this->user_analytics->track_quote($request->user()->id);

        return Inertia::render('generated-quote', [
            'title' => 'Generated quote',
            'body' => $response->text(),
        ]);
    }
}
