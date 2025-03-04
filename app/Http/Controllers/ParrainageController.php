<?php

namespace App\Http\Controllers;

use App\Models\Candidat;
use App\Models\Electeur;
use App\Models\GestionParrainage;
use App\Models\Parrain;
use App\Models\Parrainage;
use App\Notifications\ParrainagevalidationMail;
use App\Notifications\ParrainageVerificationMail;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isJson;

class ParrainageController extends Controller
{
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
        $validatedData = $request->validate([
            'numElecteur' => 'required|string',
            'numCIN' => 'required|string',
        ]);

        $electeur = Electeur::where('numElecteur', $validatedData['numElecteur'])
            ->where('numCIN', $validatedData['numCIN'])
            ->first();

        if (!$electeur) {
            return response()->json([
                'status' => 'error',
                'description' => 'Les informations fournies sont incorrectes.'
            ], 404);
        }

        return response()->json([
            'nom' => $electeur->nom,
            'prenoms' => $electeur->prenoms,
            'dateNaissance' => $electeur->dateNaissance,
            'bureauVote' => $electeur->bureauVote ?? 'Non défini',
        ]);
    }

    public function verifyAuthCode(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'numElecteur' => 'required|string',
            'codeAuth' => 'required|string', // Code d'authentification
        ]);

        // Recherche du parrain par le numéro d'électeur
        $parrain = Parrain::where('numElecteur', $validatedData['numElecteur'])
            ->first();

        // Vérification du parrain
        if (!$parrain) {
            return response()->json([
                'status' => 'error',
                'description' => 'Les informations du parrain sont incorrectes.'
            ], 404);
        }

        // Vérification du code d'authentification
        if ($parrain->code !== $validatedData['auth_code']) {
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
                    'nom' => $candidat->nom,
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

        $parrain = Parrain::with('foreigner')->where("numElecteur", "1001")->first();

        $code = rand(10000, 99999);
        Cache::put('code_verification_' . $validatedData['numElecteur'], $code, now()->addMinutes(10));
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


        if(!$candidatExists){
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

    public function index()
    {
        //
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
