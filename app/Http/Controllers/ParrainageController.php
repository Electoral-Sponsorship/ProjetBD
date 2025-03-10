<?php

namespace App\Http\Controllers;


use Carbon\Carbon;
use App\Models\Parrain;
use App\Models\Candidat;
use App\Models\Electeur;
use App\Models\Parrainage;
use Illuminate\Http\Request;
use function Pest\Laravel\get;
use App\Models\GestionParrainage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;
use function PHPUnit\Framework\isJson;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreParrainageRequest;
use App\Notifications\ParrainagevalidationMail;
use App\Notifications\ParrainageVerificationMail;


class ParrainageController extends Controller {
    /**
     * Enregistrer un parrainage.
     */
    // public function store(StoreParrainageRequest $request) {

    //     $parrainage = Parrainage::create([
    //         'idParrain' => $request->idParrain,
    //         'dateParrainage' => now(),
    //     ]);

    //     return response()->json([
    //         'message' => 'Parrainage enregistré avec succès.',
    //         'data' => $parrainage
    //     ], 201);
    // } 

    public function index() {
        $parrainages = Parrainage::with('parrain')->get();

        return response()->json($parrainages);
    }

     /**
     * Display a listing of the resource.
     */
    public function setSponsorshipPeriod(Request $request)
    {
        // Validation des dates
        $validator = Validator::make($request->all(), [
            'dateDebut' => 'required|date|after_or_equal:' . Carbon::now()->subMonths(6)->toDateString(),
            'dateFin' => 'required|date|after:dateDebut',
            'idAdmin' => 'required|integer',
        ]);

        // Vérifier si la validation a échoué
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'description' => $validator->errors()
            ], 400);
        }

        try {
            GestionParrainage::create([
                'dateDebut' => $request->input('dateDebut'),
                'dateFin' => $request->input('dateFin'),
                'etatOuverture' => true, // Etat "ouvert" est true
                'idAdmin' => $request->input('idAdmin'),
            ]);

            return response()->json([
                'status' => 'success',
                'description' => 'Période de parrainage défini. Les candidats seront à présent restreintes.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'description' => 'Erreur lors de l\'enregistrement de la période de parrainage: ' . $e->getMessage(),
            ], 500); // Code d'erreur 500 pour des erreurs serveur
        }
    }

    public function verifyIdentifiers(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'numElecteur' => 'required|digits:9',
                'numCIN' => 'required|digits:17',
            ]);

            $electeur = Electeur::where('numElecteur', $request->input('numElecteur'))->first();


            if (!$electeur) {
                return response()->json([
                    'status' => 'error',
                    'description' => 'Les informations fournies sont incorrectes.'
                ], 404);
            }

            return response()->json([
                'numElecteur' => $electeur->numElecteur,
                'nom' => $electeur->nom,
                'prenoms' => $electeur->prenoms,
                'dateNaissance' => $electeur->dateNaissance,
                'bureauVote' => $electeur->bureauVote
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'description' => $e->getMessage(),
            ]);
        }
    }

    public function verifyAuthCode(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'numElecteur' => 'required|string',
            'codeAuth' => 'required|string', // Code d'authentification
        ]);
        $numElecteur = $request->input('numElecteur');
        $codeAuth = $request->input('codeAuth');
        // Recherche du parrain par le numéro d'électeur
        $parrain = Parrain::where('numElecteur', $numElecteur)->first();

        // Vérification du parrain
        if (!$parrain) {
            return response()->json([
                'status' => 'error',
                'description' => 'Les informations du parrain sont incorrectes.'
            ], 404);
        }

        // Vérification du code d'authentification
        if ($parrain->codeAuthentification != $codeAuth) {
            return response()->json([
                'status' => 'error',
                'description' => 'Le code d\'authentification est invalide.'
            ], 400);
        }

        // Si le code est valide, récupérer la liste des candidats
        return $this->getCandidatesList();
    }


    public function getCandidatesList()
    {
        // Récupérer tous les candidats
        $candidats = Candidat::all();

        if ($candidats->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'description' => 'Aucun candidat disponible.'
            ], 404);
        }

        // Retourner les informations des candidats
        return response()->json([
            'status' => 'success',
            'candidats' => $candidats->map(function ($candidat) {
                return [
                    'idCandidat' => $candidat->idCandidat,
                    'nom' => $candidat->electeur->nom,
                    'parti' => $candidat->nomParti,
                    'slogan' => $candidat->slogan,
                    'couleurs' => $candidat->couleurs,
                    'urlPageInfo' => $candidat->urlPageInfo,
                    'photo' => url('storage/' . $candidat->photo),  // Assurez-vous que la photo est dans le dossier 'storage'
                ];
            })
        ]);
    }

    public function sendValidationCode(Request $request)
    {
        $validatedData = $request->validate([
            'numElecteur' => 'required|string',
        ]);

        $parrain = Parrain::with('foreigner')->where("numElecteur", $validatedData['numElecteur'])->first();

        $code = rand(10000, 99999);
        Cache::put('code_verification_' . $validatedData['numElecteur'], $code, now()->addMinutes(50));
        $parrain->notify(new ParrainagevalidationMail($code, $parrain->foreigner->prenoms, $parrain->foreigner->nom));

        return response()->json([
            'status' => 'success',
            'desciption' => 'Code de vérification envoyé'
        ]);
    }

    public function sendVerificationCode(Request $request)
    {
        $validatedData = $request->validate([
            'numElecteur' => 'required|string',
            'codeValidation' => 'required|string',
        ]);

        $numElecteur = $validatedData['numElecteur'];
        $code = Cache::get('code_verification_' . $numElecteur);

        if ($code != $validatedData['codeValidation']) {
            return response()->json([
                'status' => 'error',
                'description' => 'Code expiré'
            ]);
        }

        do {
            $code = rand(10000, 99999);
        } while (Parrain::where('codevalidation', $code)->exists());


        // Trouver le parrain avec son numElecteur
        $parrain = Parrain::all()->where("numElecteur", "1001")->first();
//        $parrain->codevalidation = $code;

//        $parrain->update(['codevalidation' => $code]);
        DB::table('parrains')
            ->where('numElecteur', $parrain->numElecteur)
            ->update([
                'codevalidation' => $code,
                'dateParrainage' => Carbon::today()
            ]);

//        return($parrain);
        $parrain->notify(new ParrainageVerificationMail($code, $parrain->foreigner->prenoms, $parrain->foreigner->nom));

        return response()->json([
            'status' => 'success',
            'description' => 'Parrainage effectué'
        ]);


    }

    public function trackSponsorshipProgress(Request $request)
    {
        $request->validate([
            'idUser' => 'required|integer',
            'codeAuth' => 'required|integer',
            'email' => 'email|string',
        ]);


        $candidatExists = Candidat::where([
            ['codeAuth', '=', $request->input('codeAuth')],
            ['adresseMail', '=', $request->input('email')]
        ])->exists();


        if (!$candidatExists) {
            return response()->json([
                'status' => 'error',
                'description' => 'Cette candidat est introuvable.'
            ]);
        };

        $id = $request->input('idUser');
        $parrainages = Parrainage::where('idCandidat', $id)->get();  // Utilise get() pour récupérer les résultats

        if ($parrainages->isEmpty()) {  // Vérifie si la collection est vide
            return response()->json([
                'status' => 'error',
                'description' => 'Désolé vous n\'avez aucun parrainage disponible.'
            ]);
        } else {
            $electeurs = [];


            foreach ($parrainages as $parrainnage) {
                $idparrain = $parrainnage->idParrain;
                $parrain = Parrain::where('idParrain', $idparrain)->get()->first();
                $electeur = $parrain->foreigner;
                $electeurs[] = [
                    'numElecteur' => $electeur->numElecteur,
                    'nom' => $electeur->nom,
                    'prenoms' => $electeur->prenoms,
                    'sexe' => $electeur->sexe,
                ];
            }
            return response()->json($electeurs);  // Retourne les parrainages si disponibles
        }


    }
  
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

