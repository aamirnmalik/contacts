<?php

use App\Http\Controllers\API\ContactApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group([
    'middleware' => ['auth:sanctum', 'throttle:60,1'],
], static function () {
    Route::resource('contacts', ContactApiController::class);
});