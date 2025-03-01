<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Administrateur;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AdministrateurController extends Controller{
    /**
     * Connexion de l'administrateur
     */
    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Administrateur::where('adresseMail', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->motDePasse)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        // 🔥 Récupérer la vraie adresse IP
        $ipAddress = $request->ip();

        // 🔍 Log pour vérifier si Laravel détecte bien l'IP
        Log::info('Adresse IP détectée : ' . $ipAddress);

        // Mettre à jour l'IP dans la base de données
        $admin->update([
            'last_ip' => $ipAddress
        ]);

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'admin' => [
                'id' => $admin->idAdmin,
                'email' => $admin->adresseMail,
                'last_ip' => $ipAddress, // 🔥 Voir si l'IP retournée est correcte
            ]
        ]);
    }

    /**
     * Obtenir les informations de l'administrateur connecté
     */
    public function user(Request $request){
        $admin = $request->user();
        return response()->json([
            'id' => $admin->idAdmin,
            'email' => $admin->adresseMail,
            'last_ip' => $admin->last_ip, // Retourne aussi l'IP
        ]);
    }

    /**
     * Déconnexion de l'administrateur
     */
    public function logout(Request $request){
        $admin = $request->user();
        // Suppression des tokens
        if ($admin) {
            $admin->currentAccessToken()->delete(); // ✅ Supprime uniquement ce token!!
        }
        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }
}







