<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    if (!$request->user()) {
        return redirect('/login');
    } else {
        return redirect('/home');
    }
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::get('/home', function () {
    return Inertia::render('home');
})->name('portal-home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
