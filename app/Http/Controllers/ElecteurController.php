<?php

namespace App\Http\Controllers;

use App\Models\ControleElecteur;
use App\Models\ElecteurTemporaire;
use App\Models\Historisation;
use App\Models\Parrainage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use League\Csv\Reader;
use Illuminate\Support\Facades\Validator;
use App\Models\Electeur;


class ElecteurController extends Controller
{

    protected static $EtatUploadElecteurs = false;

    public function checkElectoralFile(Request $request)
    {
        if (self::$EtatUploadElecteurs) {
            return response()->json([
                'status' => 'error',
                'description' => 'Un fichier electoral est déjà en cours d\'imporation et/ou de validation ',
            ]);
        }
//        $filePath = "D:\\ESP\\L3 GLSI\\SGBD\\electeurs.csv";
//        $file = $file = new UploadedFile($filePath, basename($filePath), 'text/csv', null, true);

        // 🔹 Calculer le checksum SHA-256 du fichier
//        $checksum = hash_file('sha256', $filePath);

        // 🔹 Créer une requête simulée
//        $request = new Request([
//            'checksum' => $checksum, // Passer le vrai checksum
//        ]);

        // 🔹 Ajouter le fichier à la requête
//        $request->files->set('electoral_file', $file);

        $request->validate([
            'electoral_file' => 'required|file|mimes:csv,txt',
            'checksum' => 'required'
        ]);

        self::$EtatUploadElecteurs = true;

        try {
            $checksum = $request->input('checksum');
            $jsonData = $this->calculateChecksum($request)->getData(true);

            if ($jsonData['status'] == 'success') {
//                dd($jsonData['checksum']);
//                dd($jsonData['checksum'],$checksum);
                if ($jsonData['checksum'] == $checksum) {

                    $importResponse = $this->importElectoralFile($request)->getData(true);

                    // Vérifier si la réponse contient une erreur
                    if ($importResponse['status'] == 'success') {
                        $response = $this->checkElector($request)->getData(true); // $response est un JSON
                        return response()->json([
                            'status' => $response['status'],
                            'description' => $response['description'],
                            'recommendation' => $response['recommendation'] ?? null,
                            'etatImportationTemporaire' => $importResponse['description']
                        ]);
                    } else {
                        return response()->json([
                            'status' => $importResponse['status'],
                            'description' => $importResponse['description'],
                            'message' => $importResponse['message'],
                        ]);
                    }
//                    return response()->json([
//                        'status' => $response['status'],
//                        'description' => $response['description'],
//                        'recommendation' => $response['recommendation'] ?? null,
//                        'etatImportationTemporaire' => $importResponse['status'] == 'success' ? $importResponse['description'] : [$importResponse['message'], $importResponse['description']]
//                    ]);

//                        dd($importResponse);
//                        if ($importResponse['status'] == 'success') {
//
//                            // Appel de la fonction du controle des électeurs
//
//
//                            //Retour à supprimer après test
//                            return response()->json([
//                                'status' => 'success',
//                                'message' => "Fichier importé avec succès dans la table temporaire!"
//                            ]);
//                        }

                } else {
                    Historisation::create([
                        "idAdmin" => "",
                        "adresseIp" => "",
                        "dateHistorisation" => date("Y-m-d"),
                        "clef" => $checksum
                    ]);

                    return response()->json([
                        'status' => 'error',
                        'description' => "L'empreinte du fichier ne correspond pas!"
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'description' => "Impossible de vérifier l'empreinte du fichier"
                ]);
            }

        } catch (\Exception $e) {
            self::$EtatUploadElecteurs = false;
            return response()->json([
                'status' => 'error',
                'description' => $e->getMessage()
            ]);
        }
    }

    public function calculateChecksum(Request $request)
    {
//        // Validation du fichier
//        $request->validate([
//            'electoral_file' => 'required|file|mimes:csv,txt', // Modifier les types selon besoin
//        ]);

        try {
            // Récupérer le fichier téléchargé
            $file = $request->file('electoral_file');

            // Calculer l'empreinte SHA256 du fichier
            $checksum = hash_file('sha256', $file->getRealPath());

            // Retourner l'empreinte en réponse
            return response()->json([
                'status' => 'success',
                'checksum' => $checksum,
            ], 200);

        } catch (\Exception $e) {
            // Gestion des erreurs
            self::$EtatUploadElecteurs = false;
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors du calcul de l\'empreinte : ' . $e->getMessage(),
            ], 500);
        }
    }

    public function importElectoralFile(Request $request)
    {
        try {
            $csv = Reader::createFromPath($request->file('electoral_file')->getRealPath(), 'r');
//            $csvPath = 'C:\\Users\\latee\\Downloads\\electeurs.csv';
//            $csv = Reader::createFromPath($csvPath, 'r');
            $csv->setHeaderOffset(0);


            foreach ($csv->getRecords() as $record) {
//                dd($record);
                ElecteurTemporaire::create([
                    'numElecteur' => $record['numElecteur'],
                    'numCIN' => $record['numCIN'],
                    'nom' => $record['nom'],
                    'prenoms' => $record['prenoms'],
                    'dateNaissance' => $record['dateNaissance'],
                    'lieuNaissance' => $record['lieuNaissance'],
                    'sexe' => $record['sexe']
                ]);
            }
            return response()->json([
                'status' => 'success',
                'description' => "Insertion dans la table temporaire réussie"
            ]);

        } catch (\Exception $e) {
            // Gestion d'une erreur inattendue lors du traitement
            self::$EtatUploadElecteurs = false;
            return response()->json([
                'status' => 'error',
                'description' => "Impossible d'insérer les données",
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function checkElector(Request $request)
    {

        $file = $request->file('electoral_file');
        $csv = Reader::createFromPath($file->getRealPath(), 'r');
//            $csvPath = 'C:\\Users\\latee\\Downloads\\electeurs.csv';
//            $csv = Reader::createFromPath($csvPath, 'r');
        $csv->setHeaderOffset(0);

        $bool = true;
        foreach ($csv->getRecords() as $record) {
//                dd($record);
            $values = ([
                'numElecteur' => $record['numElecteur'],
                'numCIN' => $record['numCIN'],
                'nom' => $record['nom'],
                'prenoms' => $record['prenoms'],
                'dateNaissance' => $record['dateNaissance'],
                'lieuNaissance' => $record['lieuNaissance'],
                'sexe' => $record['sexe']
            ]);
            $validator = Validator::make($values, [
                'numElecteur' => 'required|digits:9',
                'numCIN' => 'required|digits:17',
                'nom' => [
                    'required',
                    'string',
                    'regex:/^[A-Z][a-z\'\-]*$|^[A-Z]+(\-[A-Z]+)*$|^[A-Z][a-z\'\-]*[A-Z]+$/'
                ],
                'prenoms' => [
                    'required',
                    'string',
                    'regex:/^[A-Z][a-z\'\-]*$|^[A-Z]+(\-[A-Z]+)*$|^[A-Z][a-z\'\-]*[A-Z]+$/'
                ],
                'dateNaissance' => 'required|date_format:d-m-Y',
                'lieuNaissance' => [
                    'required',
                    'string',
                    'regex:/^[A-Za-z0-9\s\'\-]+$/',
                ],
                'sexe' => ['required', Rule::in(['Masculin', 'Feminin'])]
            ]);

            if ($validator->fails()) {
                $bool = false;
                // Enregistrer les erreurs dans la table controle_electeurs
                ControleElecteur::create([
                    'idAdmin' => '',
                    'NumElecteur' => $record['numElecteur'],
                    'NumCIN' => $record['numCIN'],
                    'NatureProbleme' => json_encode($validator->errors()),
                ]);
            }

        }
        if (!$bool) {
            self::$EtatUploadElecteurs = false;
            return response()->json([
                'status' => 'error',
                'description' => 'Erreur de validation des données du fichier importé',
                'recommendation' => 'Assurez-vous de vérifier la conformité de chaque ligne du fichier electoral'
            ]);
        } else {
            return response()->json([
                'status' => 'success',
                'description' => 'le fichier est validable'
            ]);
        }
    }

    public function validateImport()
    {
        try {
            // Commencer une transaction pour garantir l'intégrité des données
            DB::beginTransaction();

            // Récupérer toutes les données de la table temporaire
            $electeursTemp = ElecteurTemporaire::all();

            // Vérifier qu'il y a des données à transférer
            if ($electeursTemp->isEmpty()) {
                return response()->json([
                    'status' => 'error',
                    'description' => 'Aucun électeur dans la table temporaire à transférer.'
                ]);
            }

            // Parcourir chaque électeur temporaire et transférer les données dans la table persistante
            foreach ($electeursTemp as $electeurTemp) {
                // Insérer l'électeur dans la table persistante
                Electeur::create([
                    'numElecteur' => $electeurTemp->numElecteur,
                    'numCIN' => $electeurTemp->numCIN,
                    'nom' => $electeurTemp->nom,
                    'prenoms' => $electeurTemp->prenoms,
                    'dateNaissance' => $electeurTemp->dateNaissance,
                    'lieuNaissance' => $electeurTemp->lieuNaissance,
                    'sexe' => $electeurTemp->sexe,
                ]);
            }

            // Supprimer toutes les données de la table temporaire après transfert
            ElecteurTemporaire::truncate();

            // Commit de la transaction si tout s'est bien passé
            DB::commit();

            return response()->json([
                'status' => 'success',
                'description' => 'Données transférées avec succès de la table temporaire vers la table persistante.'
            ]);
        } catch (\Exception $e) {
            self::$EtatUploadElecteurs = false;
            // Si une erreur survient, rollback de la transaction
            DB::rollBack();

            return response()->json([
                'status' => 'error',
                'description' => 'Erreur lors du transfert des données: ' . $e->getMessage()
            ]);
        }

    }

/**
     * Display a listing of the resource.
     */
    public
    function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public
    function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public
    function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public
    function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public
    function destroy(string $id)
    {
        //
    }
}


