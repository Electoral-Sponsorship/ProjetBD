<?php

use App\Http\Controllers\CandidatsController;
use App\Http\Controllers\ElecteurController;
use App\Models\Parrainage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/candidats', CandidatsController::class);
Route::get('verify/{numeroElecteur}',[CandidatsController::class, 'verify']);
Route::post('register', [CandidatsController::class, 'register']);
Route::post('resendCode/{numeroElecteur}', [CandidatsController::class, 'resendCode']);
Route::post('verifyCode', [CandidatsController::class, 'verifyCode']);

Route::post('/check-electoral-file', [ElecteurController::class, 'checkElectoralFile']);
Route::post('/validate-import', [ElecteurController::class, 'validateImport']);
Route::post('/set-sponsorship-period',[Parrainage::class, 'setSponsorshipPeriod']);

