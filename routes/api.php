<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidatsController;
use App\Http\Controllers\AdministrateurController;
use App\Http\Controllers\ElecteurController;

// 📌 Routes pour les candidats
Route::apiResource('/candidats', CandidatsController::class);
Route::get('/verify/{numeroElecteur}', [CandidatsController::class, 'verify']);
Route::post('/register', [CandidatsController::class, 'register']); // Correction ici

// 📌 Routes pour la gestion des électeurs
Route::post('/import-electoralFile', [ElecteurController::class, 'importElectoralFile']);
Route::post('/calculate-checksum', [ElecteurController::class, 'calculateChecksum']);

// 📌 Routes d'authentification de l'administrateur
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdministrateurController::class, 'login']); // Connexion

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AdministrateurController::class, 'user']); // Récupération des infos de l'administrateur connecté
        Route::post('/logout', [AdministrateurController::class, 'logout']); // Déconnexion
    });
});





