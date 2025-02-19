<?php

use App\Http\Controllers\CandidatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/candidats', CandidatsController::class);
Route::get('verify/{numeroElecteur}',[CandidatsController::class, 'verify']);
Route::post('register', [CandidatsController::class, 'register']);


