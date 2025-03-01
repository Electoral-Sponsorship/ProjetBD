<?php

use App\Http\Controllers\CandidatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

<<<<<<< Updated upstream
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
=======
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
Route::post('/set-sponsorship-period', [Parrainage::class, 'setSponsorshipPeriod']);

// 📌 Routes d'authentification de l'administrateur
Route::prefix('admin')->group(function () {
    Route::post('login', [AdministrateurController::class, 'login']); // Connexion
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AdministrateurController::class, 'user']); // Récupération des infos de l'administrateur connecté
        Route::post('logout', [AdministrateurController::class, 'logout']); // Déconnexion
    });
>>>>>>> Stashed changes
});

Route::apiResource('/candidats', CandidatsController::class);
Route::get('verify/{numeroElecteur}',[CandidatsController::class, 'verify']);
Route::post('register', [CandidatsController::class, 'register']);
Route::post('resendCode/{numeroElecteur}', [CandidatsController::class, 'resendCode']);
Route::post('verifyCode', [CandidatsController::class, 'verifyCode']);

Route::post('/import-electoralFile',[\App\Http\Controllers\ElecteurController::class, 'importElectoralFile']);
Route::post('/calculate-checksum',[\App\Http\Controllers\ElecteurController::class, 'calculateChecksum']);




