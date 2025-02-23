<?php

namespace App\Http\Controllers;

use App\Models\Candidat;
use App\Models\Electeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Notifications\CandidatMail;
use Symfony\Contracts\Service\Attribute\Required;

class CandidatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        //
    }

    public function verify($numeroElecteur){
        $electeur = Electeur::where('numElecteur', '=', $numeroElecteur)->first();
        if(!$electeur) {
            return response()->json([
                'message' => 'Cet electeur n\'existe pas' 
            ]);
        }
        $candidat = Candidat::where('numElecteur', '=', $numeroElecteur)->first();
        if($candidat) {
            return response()->json([
                'message' => 'Ce candidat existe deja.' 
            ]);
        }
        return response()->json([
            [
                'message' => 'Cet electeur existe et peut etre candidat.',
                'candidat' => [
                    'nom' => $electeur->nom,
                    'prenom' => $electeur->prenoms,
                    'numElecteur' => $electeur->numElecteur,
                    'ddn' => $electeur->dateNaissance
                ],
            ] 
        ]);
    }

    public function register(Request $request) {
        $request->validate([
            'numeroElecteur' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'required|email',
            'parti' => 'required|string',
            'slogan' => 'required|string',
            'couleurs' => 'required|string',
            'urlInfo' => 'required|url',
        ]);
        $electeur = Electeur::where('numElecteur', '=', $request->numeroElecteur)->first();
        if(!$electeur) {
            return response()->json([
                'message' => 'Cet electeur n\'existe pas' 
            ]);
        }
        $candidat = Candidat::where('numElecteur', '=', $request->numeroElecteur)->first();
        if($candidat) {
            return response()->json([
                'message' => 'Ce candidat existe deja.',
            ]);
               
        }
        if (Candidat::where('adresseMail', '=', $request->email)->exists()) {
            return response()->json([
                'message' => 'Cet email est déjà utilisé par un autre candidat.',
            ]);
        }
        $candidat = Candidat::create([
            'numElecteur' => $request->numeroElecteur,
            'numTel' => $request->telephone,
            'adresseMail' => $request->email,
            'nomParti' => $request->parti,
            'slogan' => $request->slogan,
            'couleurs' =>  $request->couleurs,
            'urlPageInfo' => $request->urlInfo
        ]);
        $code = rand(1000, 9999);
        Cache::put('code_verification_' . $request->numeroElecteur, $code, now()->addMinutes(10));
        $candidat->notify(new CandidatMail($code, $electeur->prenoms, $electeur->nom));
        return response()->json([
            'message' => 'Candidat enregistre avec succes. Un code de securite a ete envoye par e-mail',
            'candidat' => $candidat 
        ]);
    }

    public function resendCode($numeroElecteur) {
        $candidat = Candidat::with('electeur')->where('numElecteur', '=', $numeroElecteur)->first();
        if (!$candidat) {
            return response()->json(['message' => 'Candidat non trouvé.']);
        }
        $code = rand(1000, 9999);
        Cache::put('code_verification_' . $numeroElecteur, $code, now()->addMinutes(10));
        $candidat->notify(new CandidatMail($code, $candidat->electeur->prenoms, $candidat->electeur->nom));
        return response()->json([
            'message' => 'Le nouveau code de securite a ete envoye par e-mail',
        ]);
    }

    public function verifyCode(Request $request){
        $request->validate([
            'email' => 'required|string',
            'code' => 'required|string',
        ]);
        $candidat = Candidat::where('adresseMail', '=', $request->email)->first();
        $codeStocke = Cache::get('code_verification_' . $candidat->numElecteur);
        if (!$codeStocke) {
            return response()->json([
                'message' => 'Code expiré ou inexistant. Veuillez renvoyer un nouveau code.',
            ]);
        }
        if ($request->code == $codeStocke) {
            Cache::forget('code_verification_' . $candidat->numElecteur);
            return response()->json([
                'message' => 'Code de sécurité vérifié avec succès. Vous pouvez accéder à votre espace candidat.',
            ]);
        }else {
            return response()->json([
                'message' => 'Code incorrect. Veuillez réessayer.',
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id){
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id){
        //
    }
}
