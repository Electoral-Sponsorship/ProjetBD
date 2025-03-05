<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
=======
use App\Models\ControleElecteur;
use App\Models\ElecteurTemporaire;
use App\Models\Historisation;
use App\Models\Parrainage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use League\Csv\Reader;
use Illuminate\Support\Facades\Validator;
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
use App\Models\Electeur;
use App\Models\ElecteurTemporaire;
use App\Models\ControleElecteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use League\Csv\Reader;

class ElecteurController extends Controller
{
    protected static $EtatUploadElecteurs = false;

    public function checkElectoralFile(Request $request)
    {
        if (self::$EtatUploadElecteurs) {
            return response()->json([
                'status' => 'error',
                'description' => 'Un fichier électoral est déjà en cours d\'importation.',
            ]);
        }

        $request->validate([
            'electoral_file' => 'required|file|mimes:csv,txt',
            'checksum' => 'required',
            'idAdmin' => 'required',
        ]);

        self::$EtatUploadElecteurs = true;

        try {
            $idAdmin = $request->input("idAdmin");
            $checksum = $request->input('checksum');
            $jsonData = $this->calculateChecksum($request)->getData(true);

<<<<<<< HEAD
            if ($jsonData['status'] == 'success' && $jsonData['checksum'] == $checksum) {
                $importResponse = $this->importElectoralFile($request)->getData(true);
=======
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
                    $ipAddress = $request->header('X-Forwarded-For') ?? $request->ip();
                    Historisation::create([
                        "idAdmin" => $idAdmin,
                        "adresseIp" => $ipAddress,
                        "dateHistorisation" => date("Y-m-d"),
                        "clef" => $checksum
                    ]);
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4

                if ($importResponse['status'] == 'success') {
                    $response = $this->checkElector($request)->getData(true);
                    return response()->json([
                        'status' => $response['status'],
                        'description' => $response['description'],
                        'recommendation' => $response['recommendation'] ?? null,
                        'etatImportationTemporaire' => $importResponse['description']
                    ]);
                } else {
                    return response()->json($importResponse);
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'description' => "L'empreinte du fichier ne correspond pas."
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
        try {
            $file = $request->file('electoral_file');
            $checksum = hash_file('sha256', $file->getRealPath());

            return response()->json([
                'status' => 'success',
                'checksum' => $checksum,
            ], 200);
        } catch (\Exception $e) {
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
            $csv->setHeaderOffset(0);

<<<<<<< HEAD
            foreach ($csv->getRecords() as $record) {
                // Vérifier si l'électeur existe déjà
                $exists = Electeur::where('numElecteur', $record['numElecteur'])->exists() ||
                    ElecteurTemporaire::where('numElecteur', $record['numElecteur'])->exists();

                if (!$exists) {
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
=======
            ElecteurTemporaire::truncate();

            foreach ($csv->getRecords() as $record) {
//                dd($record);
                ElecteurTemporaire::create([
                    'numElecteur' => $record['numElecteur'],
                    'numCIN' => $record['numCIN'],
                    'nom' => $record['nom'],
                    'prenoms' => $record['prenoms'],
                    'dateNaissance' => $record['dateNaissance'],
                    'lieuNaissance' => $record['lieuNaissance'],
                    'sexe' => $record['sexe'],
                    'bureauVote' => $record['bureauVote'],
                ]);
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
            }

            return response()->json([
                'status' => 'success',
                'description' => "Importation réussie dans la table temporaire."
            ]);

        } catch (\Exception $e) {
            self::$EtatUploadElecteurs = false;
            return response()->json([
                'status' => 'error',
<<<<<<< HEAD
                'description' => "Erreur d'importation.",
=======
                'description' => "Impossible d'insérer les données"  . $e->getMessage(),
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function checkElector(Request $request)
    {
<<<<<<< HEAD
=======

        $idAdmin = $request->input('idAdmin');
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
        $file = $request->file('electoral_file');
        $csv = Reader::createFromPath($file->getRealPath(), 'r');
        $csv->setHeaderOffset(0);

        $hasErrors = false;
        foreach ($csv->getRecords() as $record) {
<<<<<<< HEAD
            $validator = Validator::make($record, [
                'numElecteur' => 'required|digits:9|unique:electeurs,numElecteur',
                'numCIN' => 'required|digits:17',
                'nom' => 'required|string|regex:/^[A-Z][a-z\'\-]*$/',
                'prenoms' => 'required|string|regex:/^[A-Z][a-z\'\-]*$/',
                'dateNaissance' => 'required|date_format:Y-m-d',
                'lieuNaissance' => 'required|string',
                'sexe' => 'required|in:Masculin,Feminin'
=======
//                dd($record);
            $values = ([
                'numElecteur' => $record['numElecteur'],
                'numCIN' => $record['numCIN'],
                'nom' => $record['nom'],
                'prenoms' => $record['prenoms'],
                'dateNaissance' => $record['dateNaissance'],
                'lieuNaissance' => $record['lieuNaissance'],
                'sexe' => $record['sexe'],
                'bureauVote' => $record['bureauVote'],
            ]);
            $validator = Validator::make($values, [
                'numElecteur' => 'required|digits:9',
                'numCIN' => 'required|digits:17',
                'nom' => [
                    'required',
                    'string',
                    'regex:/^([A-Z]+([A-Z\'-]+)*)$|^([A-Z][a-z\'-]+)*$/'
                ],
                'prenoms' => [
                    'required',
                    'string',
                    'regex:/^([A-Z][a-zA-Z\'-]+)(\s[A-Z][a-zA-Z\'-]+)*$/'
                ],
                'dateNaissance' => 'required|date_format:Y-m-d',
                'lieuNaissance' => [
                    'required',
                    'string',
                    'regex:/^[A-Za-zÀ-ÿ0-9\s\'\-]+$/'
                ],
                'sexe' => ['required', Rule::in(['Masculin', 'Feminin'])],
                'bureauVote' => ['required', 'string']
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
            ]);

            if ($validator->fails()) {
                $hasErrors = true;
                ControleElecteur::create([
<<<<<<< HEAD
                    'numElecteur' => $record['numElecteur'],
                    'numCIN' => $record['numCIN'],
=======
                    'idAdmin' => $idAdmin,
                    'NumElecteur' => $record['numElecteur'],
                    'NumCIN' => $record['numCIN'],
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
                    'NatureProbleme' => json_encode($validator->errors()),
                ]);
            }
        }

        if ($hasErrors) {
            return response()->json([
                'status' => 'error',
                'description' => 'Erreurs de validation détectées.',
                'recommendation' => 'Vérifiez la conformité des données du fichier.'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'description' => 'Le fichier est validable.'
        ]);
    }

    public function validateImport()
    {
        try {
            DB::beginTransaction();

            $electeursTemp = ElecteurTemporaire::all();

            if ($electeursTemp->isEmpty()) {
                return response()->json([
                    'status' => 'error',
                    'description' => 'Aucun électeur à transférer.'
                ]);
            }

            foreach ($electeursTemp as $electeurTemp) {
<<<<<<< HEAD
                $exists = Electeur::where('numElecteur', $electeurTemp->numElecteur)->exists();

                if (!$exists) {
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
=======
                // Insérer l'électeur dans la table persistante
                Electeur::create([
                    'numElecteur' => $electeurTemp->numElecteur,
                    'numCIN' => $electeurTemp->numCIN,
                    'nom' => $electeurTemp->nom,
                    'prenoms' => $electeurTemp->prenoms,
                    'dateNaissance' => $electeurTemp->dateNaissance,
                    'lieuNaissance' => $electeurTemp->lieuNaissance,
                    'sexe' => $electeurTemp->sexe,
                    'bureauVote' => $electeurTemp->bureauVote
                ]);
//                dd(Electeur::all());
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
            }

            ElecteurTemporaire::truncate();
            DB::commit();

<<<<<<< HEAD
            return response()->json([
                'status' => 'success',
                'description' => 'Données transférées avec succès.'
            ]);
=======
        } catch (\Exception $e) {
            self::$EtatUploadElecteurs = false;
            if ($e->getMessage() == "There is no active transaction") {
                return response()->json([
                    'status' => 'success',
                    'description' => 'Données transférées avec succès de la table temporaire vers la table persistante.'
                ], 201);
            }
            // Si une erreur survient, rollback de la transaction
            DB::rollBack();
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
<<<<<<< HEAD
                'description' => 'Erreur de validation : ' . $e->getMessage()
            ]);
        }
    }
}
=======
                'description' => 'Erreur lors du transfert des données: ' . $e->getMessage()
            ], 400);
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
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
