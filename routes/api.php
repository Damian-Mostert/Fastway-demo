<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => '/api/v1',
], function () {
    Route::get('track-parcel', [HomeController::class, 'track_parcel']);
    Route::get('generate-quote', [HomeController::class, 'generate_quote']);
})->middleware('auth');
