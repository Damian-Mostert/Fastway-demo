<?php

use App\Http\Controllers\FastwayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Base redirect
Route::get('/', function (Request $request) {
    if (!$request->user()) {
        return redirect('/login');
    } else {
        return redirect('/home');
    }
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard pages
    Route::get('analytics', function (Request $request) {
        $user = $request->user();
        if (!$user) {
            abort(500, 'No user');
        }
        $analytics = $user->analytics()->first();

        return Inertia::render('analytics', [
            'total_tracked' => $analytics?->total_tracked ?? 0,
            'total_quotes' => $analytics?->total_quotes ?? 0,
            'total_shipped' => $analytics?->total_shipped ?? 0,
        ]);
    })->name('analytics');
    Route::get('/home', function () {
        return Inertia::render('home');
    })->name('portal-home');
    Route::get('/home', function () {
        return Inertia::render('home');
    })->name('portal-home');
    Route::get('/track', function () {
        return Inertia::render('track');
    })->name('track');
    Route::get('/quote', function () {
        return Inertia::render('quote');
    })->name('quote');
    // Fastwway controller driven
    Route::get('/old-quotes', [FastwayController::class, 'get_old_quotes'])->name('old-quotes');
    Route::get('view-old-quote', [FastwayController::class, 'view_old_quote']);
    Route::group([
        'prefix' => '/api/v1',
    ], function () {
        Route::get('track-parcel', [FastwayController::class, 'track_parcel']);
        Route::get('generate', [FastwayController::class, 'generate']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
