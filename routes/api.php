<?php

use App\Http\Controllers\FastwayController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => '/api/v1',
], function () {
    Route::get('track-parcel', [FastwayController::class, 'track_parcel']);
    Route::get('generate', [FastwayController::class, 'generate']);
})->middleware('auth');
