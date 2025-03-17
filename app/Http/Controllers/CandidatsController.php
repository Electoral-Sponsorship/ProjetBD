<?php

namespace App\Http\Controllers;

use App\Models\Candidat;
use App\Models\Electeur;
use Illuminate\Http\Request;
use App\Models\GestionParrainage;
use App\Notifications\CandidatMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Symfony\Contracts\Service\Attribute\Required;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class CandidatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
    $candidats = Candidat::with('electeur')->get();
    $formattedCandidats = $candidats->map(function ($candidat) {
        return [
            'idCandidat' => $candidat->idCandidat,
            'nom' => $candidat->electeur->nom,
            'prenom' => $candidat->electeur->prenoms,
            'numElecteur' => $candidat->electeur->numElecteur,
            'ddn' => $candidat->electeur->dateNaissance,
            'email' => $candidat->adresseMail,
            'parti' => $candidat->nomParti,
            'slogan' => $candidat->slogan,
            'telephone' => $candidat->numTel,
            'couleurs' => $candidat->couleurs,
        ];
    });

    return response()->json($formattedCandidats, 200);
}

    private function generateCode() {
        do {
            $code = rand(1000, 9999);
        } while(Candidat::where('codeAuth', $code)->exists());
        return $code;
    }

    public function verify($numeroElecteur){
        $electeur = Electeur::where('numElecteur', '=', $numeroElecteur)->first();
        if(!$electeur) {
            return response()->json([
                'message' => 'Cet electeur n\'existe pas' 
            ],400);
        }
        $candidat = Candidat::where('numElecteur', '=', $numeroElecteur)->first();
        if($candidat) {
            return response()->json([
                'message' => 'Ce candidat existe deja.' 
            ],400);
        }
        return response()->json([
            'message' => 'Cet electeur existe et peut etre candidat.',
            'candidat' => [
                'nom' => $electeur->nom,
                'prenom' => $electeur->prenoms,
                'numElecteur' => $electeur->numElecteur,
                'ddn' => $electeur->dateNaissance
            ],
        ], 200);
    }

    public function register(Request $request) {
        if(GestionParrainage::where('dateDebut', '<=', now())->exists()) {
            return response()->json([
                'message' => "La période de parrainage a débuté, vous ne pouvez plus vous enregistrer"
            ], 400);
        } else {
            $request->validate([
                'numeroElecteur' => 'required|string',
                'telephone' => 'required|string',
                'email' => 'required|email',
                'parti' => 'required|string',
                'slogan' => 'required|string',
                'couleurs' => 'required|string',
                'urlInfo' => 'required|url',
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $electeur = Electeur::where('numElecteur', '=', $request->numeroElecteur)->first();
                if(!$electeur) {
                    return response()->json([
                        'message' => 'Cet electeur n\'existe pas' 
                    ],400);
                }
            $candidat = Candidat::where('numElecteur', '=', $request->numeroElecteur)->first();
            if($candidat) {
                return response()->json([
                    'message' => 'Ce candidat existe deja.',
                ],400);
            }
            if (Candidat::where('adresseMail', '=', $request->email)->exists()) {
                return response()->json([
                    'message' => 'Cet email est déjà utilisé par un autre candidat.',
                ],400);
            }
            $photopath = null;
            // if($request->hasFile('photo')) {
            //     $cloudinaryImage = $request->file('photo')->storeOnCloudinary('candidats_photos');
            //     $photopath = $cloudinaryImage->getSecurePath(); 
            // }
            Log::info('Début de l\'upload Cloudinary', ['email' => $request->email]);

try {
    if ($request->hasFile('photo')) {
        $cloudinaryImage = $request->file('photo')->storeOnCloudinary('candidats_photos');
        $photopath = $cloudinaryImage->getSecurePath();
    }
} catch (\Exception $e) {
    Log::error('Erreur Cloudinary: ' . $e->getMessage());
    return response()->json([
        'message' => 'Erreur lors de l\'upload de l\'image sur Cloudinary.',
        'error' => $e->getMessage()
    ], 500);
}

Log::info('Upload Cloudinary réussi', ['photo_url' =>$photopath]);
            $candidat = Candidat::create([
                'numElecteur' => $request->numeroElecteur,
                'numTel' => $request->telephone,
                'adresseMail' => $request->email,
                'nomParti' => $request->parti,
                'slogan' => $request->slogan,
                'couleurs' =>  $request->couleurs,
                'urlPageInfo' => $request->urlInfo,
                'photo' => $photopath
            ]);
            $codeAuth = $this->generateCode();
            Cache::put('code_verification_' . $request->numeroElecteur, $codeAuth, now()->addMinutes(50));
            $candidat->notify(new CandidatMail($codeAuth, $electeur->prenoms, $electeur->nom));
            return response()->json([
                'message' => 'Candidat enregistre avec succes. Un code de securite a ete envoye par e-mail',
                'candidat' => $candidat 
            ], 201);
        }
    }
    
    public function resendCode($numeroElecteur) {
        $candidat = Candidat::with('electeur')->where('numElecteur', '=', $numeroElecteur)->first();
        if (!$candidat) {
            return response()->json([
                'message' => 'Candidat non trouvé.'
            ], 400);
        }
        $codeAuth = $this->generateCode();
        Cache::put('code_verification_' . $numeroElecteur, $codeAuth, now()->addMinutes(50));
        $candidat->notify(new CandidatMail($codeAuth, $candidat->electeur->prenoms, $candidat->electeur->nom));
        return response()->json([
            'message' => 'Le nouveau code de securite a ete envoye par e-mail',
        ], 201);
    }

    public function verifyCode(Request $request){
        $request->validate([
            'email' => 'required|string',
            'code' => 'required|string',
        ]);
        $candidat = Candidat::where('adresseMail', '=', $request->email)->first();
        if (!$candidat) {
            return response()->json([
                'message' => 'Candidat non trouvé avec cet e-mail.',
            ]);
        }
        $codeAuth = Cache::get('code_verification_' . $candidat->numElecteur);
        if (!$codeAuth) {
            return response()->json([
                'message' => 'Code expiré ou inexistant. Veuillez renvoyer un nouveau code.',
            ]);
        }
        if ($request->code == $codeAuth) {
            $candidat->update([
                'codeAuth' => $codeAuth
            ]);
            Cache::forget('code_verification_' . $candidat->numElecteur);
            return response()->json([
                'message' => 'Code de sécurité vérifié avec succès. Vous pouvez accéder à votre espace candidat.',
                'idCandidat' => $candidat->idCandidat,
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
