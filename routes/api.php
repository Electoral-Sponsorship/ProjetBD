<?php

use App\Http\Controllers\CandidatsController;
use App\Http\Controllers\ElecteurController;
use App\Http\Controllers\AdministrateurController;
use App\Http\Controllers\ParrainController;
use App\Http\Controllers\ParrainageController;
use Illuminate\Support\Facades\Route;

// 📌 Routes pour les candidats
Route::apiResource('/candidats', CandidatsController::class);
Route::get('/verify/{numeroElecteur}', [CandidatsController::class, 'verify']);
Route::post('/register', [CandidatsController::class, 'register']);
Route::post('/resendCode/{numeroElecteur}', [CandidatsController::class, 'resendCode']);
Route::post('/verifyCode', [CandidatsController::class, 'verifyCode']);

// 📌 Routes pour la gestion des électeurs
Route::post('/import-electoralFile', [ElecteurController::class, 'importElectoralFile']);
Route::post('/calculate-checksum', [ElecteurController::class, 'calculateChecksum']);
Route::post('/check-electoral-file', [ElecteurController::class, 'checkElector']);
Route::post('/validate-import', [ElecteurController::class, 'validateImport']);

// 📌 Routes pour la gestion des parrains (version corrigée)
Route::prefix('parrains')->group(function () {
    Route::post('/validate-electeur', [ParrainController::class, 'validateElecteur']); // Nouvelle route
    Route::post('/register', [ParrainController::class, 'store']);
    Route::post('/verify', [ParrainController::class, 'verify']);
});

// 📌 Routes pour la gestion du parrainage d’un candidat
Route::prefix('parrainages')->group(function () {
    Route::post('/register', [ParrainageController::class, 'store']);
    Route::get('/list', [ParrainageController::class, 'index']);
});

// 📌 Routes pour la gestion de la période de parrainage
Route::prefix('gestion-parrainage')->group(function () {
    Route::post('/set-period', [ParrainageController::class, 'setSponsorshipPeriod']);
    Route::get('/current', [ParrainageController::class, 'getCurrentSponsorshipPeriod']);
    Route::patch('/close', [ParrainageController::class, 'closeSponsorshipPeriod']);
    Route::get('/list', [ParrainageController::class, 'index']);
    Route::delete('/delete/{id}', [ParrainageController::class, 'destroy']);
});

// 📌 Routes d'authentification de l'administrateur
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdministrateurController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AdministrateurController::class, 'user']);
        Route::post('/logout', [AdministrateurController::class, 'logout']);
    });
});
