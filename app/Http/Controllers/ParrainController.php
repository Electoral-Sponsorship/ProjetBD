<?php

namespace App\Http\Controllers;

use App\Models\Parrain;
use App\Models\Electeur;
use App\Models\GestionParrainage; // Modèle modifié
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;

class ParrainController extends Controller
{
    // Vérifier si la période de parrainage est ouverte (MAJ)
    private function isParrainageOpen()
    {
        return GestionParrainage::where('dateDebut', '<=', now())->where('dateFin', '>=', now())->exists();
    }

    // Étape 1 : Validation des informations électeur (MAJ)
    public function validateElecteur(Request $request)
    {
        // 1. Vérifier la période de parrainage
        if (!$this->isParrainageOpen()) {
            return response()->json(['error' => 'La période de parrainage n\'est pas encore définie'], 403); 
        }

        // 2. Validation des données (noms de tables corrigés)
        $request->validate([
            'electorNumber' => 'required|exists:electeurs,numElecteur', // 'Electeurs' avec majuscule
            'identityNumber' => 'required|exists:electeurs,numCIN',
            'lastName' => 'required|exists:electeurs,nom',
            'votingOffice' => 'required|exists:electeurs,bureauVote',
        ]);

        // 3. Générer un token temporaire
        $token = Str::random(40);
        Cache::put('parrain_token_' . $token, $request->all(), 600);

        return response()->json([
            'verification_token' => $token,
            'message' => 'Veuillez compléter vos coordonnées'
        ]);
    }

    // Étape 2 : Enregistrement final (MAJ)
    public function store(Request $request)
    {
        // 1. Récupérer les données du token
        $data = Cache::get('parrain_token_' . $request->verification_token);
        if (!$data) {
            return response()->json(['error' => 'Token invalide ou expiré'], 400);
        }

        if (Parrain::where('numElecteur', $data['electorNumber'])->exists()) {
            return response()->json([
                'error' => 'Un électeur ne peut parrainer qu\'un seul candidat'
            ], 409);
        }


        // 2. Validation des coordonnées (noms de tables corrigés)
        $request->validate([
            'phone' => 'required|unique:parrains,numTel|regex:/^[0-9]{9}$/',
            'email' => 'required|email|unique:parrains,adresseMail',
        ]);

        // 3. Création du parrain avec code
        $code = strtoupper(Str::random(6));

        $parrain = Parrain::create([
            'numElecteur' => $data['electorNumber'],
            'numTel' => $request->phone,
            'adresseMail' => $request->email,
            'codeAuthentification' => $code,
            'dateParrainage' => now()
        ]);

        // 4. Envoi du code par email (implémenté)
        Mail::to($parrain->adresseMail)->send(new VerificationCodeMail($code));

        // 5. Nettoyer le cache
        Cache::forget('parrain_token_' . $request->verification_token);

        return response()->json([
            'message' => 'Code d\'authentification envoyé',
            'code' => $code // À retirer en production
        ], 201);
    }

    // Vérification du code (MAJ)
    public function verify(Request $request)
    {
        $request->validate([
            'numElecteur' => 'required|exists:Parrains,numElecteur', // 'Parrains' avec majuscule
            'code' => 'required|string|size:6',
        ]);

        $parrain = Parrain::where('numElecteur', $request->numElecteur)
            ->where('codeAuthentification', $request->code)
            ->first();

        if (!$parrain) {
            return response()->json(['error' => 'Code invalide'], 400);
        }

        return response()->json([
            'message' => 'Parrainage confirmé avec succès',
            'parrain' => $parrain->makeHidden('codeAuthentification')
        ]);
    }
}


