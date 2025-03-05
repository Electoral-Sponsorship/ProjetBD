<?php

use App\Http\Controllers\ParrainageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ElecteurController;
use App\Http\Controllers\CandidatsController;
use App\Http\Controllers\AdministrateurController;
use App\Http\Middleware\CorsMiddleware;

// 📌 Routes pour les candidats
Route::apiResource('/candidats', CandidatsController::class);
Route::get('/verify/{numeroElecteur}', [CandidatsController::class, 'verify']);
Route::post('/register', [CandidatsController::class, 'register']);
Route::post('/resendCode/{numeroElecteur}', [CandidatsController::class, 'resendCode']);
Route::post('/verifyCode', [CandidatsController::class, 'verifyCode']);

// 📌 Routes pour la gestion des électeurs
    Route::post('/import-electoralFile', [ElecteurController::class, 'importElectoralFile']);
    Route::post('/calculate-checksum', [ElecteurController::class, 'calculateChecksum']);
    Route::post('/check-electoral-file', [ElecteurController::class, 'checkElectoralFile']);
    Route::post('/validate-import', [ElecteurController::class, 'validateImport']);


// 📌 Routes pour la gestion du parrainage
Route::middleware(CorsMiddleware::class)->group(function() {
    Route::prefix('parrainage')->group(function () {
        Route::post('/set-sponsorship-period', [ParrainageController::class, 'setSponsorshipPeriod']);
        Route::post('/verify-identifiers', [ParrainageController::class, 'verifyIdentifiers']);
        Route::post('/verify-auth-code', [ParrainageController::class, 'verifyAuthCode']);
        Route::post('/send-verification-code', [ParrainageController::class, 'sendVerificationCode']);
        Route::post('/send-validation-code', [ParrainageController::class, 'sendValidationCode']);
        Route::post('/track-progress', [ParrainageController::class, 'trackSponsorshipProgress']);
    });
});


// 📌 Routes d'authentification de l'administrateur
Route::prefix('admin')->group(function () {
    Route::post('login', [AdministrateurController::class, 'login']); // Connexion
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AdministrateurController::class, 'user']); // Récupération des infos de l'administrateur connecté
        Route::post('logout', [AdministrateurController::class, 'logout']); // Déconnexion
    });

});


