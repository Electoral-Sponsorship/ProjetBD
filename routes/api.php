<?php

use App\Http\Controllers\CandidatsController;
use App\Http\Controllers\ElecteurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/candidats', CandidatsController::class);
Route::get('verify/{numeroElecteur}',[CandidatsController::class, 'verify']);
Route::post('register', [CandidatsController::class, 'register']);


//Route::post('/import-electoralFile',[ElecteurController::class, 'importElectoralFile']);
//Route::post('/calculate-checksum',[ElecteurController::class, 'calculateChecksum']);
Route::get('/check-electoralFile', [ElecteurController::class, 'checkElectoralFile']);



