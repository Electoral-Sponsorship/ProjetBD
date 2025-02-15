<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/import-electoralFile',[\App\Http\Controllers\ElecteurController::class, 'importElectoralFile']);
Route::post('/calculate-checksum',[\App\Http\Controllers\ElecteurController::class, 'calculateChecksum']);
