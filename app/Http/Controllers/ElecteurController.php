<?php

namespace App\Http\Controllers;

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
            'checksum' => 'required'
        ]);

        self::$EtatUploadElecteurs = true;

        try {
            $checksum = $request->input('checksum');
            $jsonData = $this->calculateChecksum($request)->getData(true);

            if ($jsonData['status'] == 'success' && $jsonData['checksum'] == $checksum) {
                $importResponse = $this->importElectoralFile($request)->getData(true);

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
            }

            return response()->json([
                'status' => 'success',
                'description' => "Importation réussie dans la table temporaire."
            ]);

        } catch (\Exception $e) {
            self::$EtatUploadElecteurs = false;
            return response()->json([
                'status' => 'error',
                'description' => "Erreur d'importation.",
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function checkElector(Request $request)
    {
        $file = $request->file('electoral_file');
        $csv = Reader::createFromPath($file->getRealPath(), 'r');
        $csv->setHeaderOffset(0);

        $hasErrors = false;
        foreach ($csv->getRecords() as $record) {
            $validator = Validator::make($record, [
                'numElecteur' => 'required|digits:9|unique:electeurs,numElecteur',
                'numCIN' => 'required|digits:17',
                'nom' => 'required|string|regex:/^[A-Z][a-z\'\-]*$/',
                'prenoms' => 'required|string|regex:/^[A-Z][a-z\'\-]*$/',
                'dateNaissance' => 'required|date_format:Y-m-d',
                'lieuNaissance' => 'required|string',
                'sexe' => 'required|in:Masculin,Feminin'
            ]);

            if ($validator->fails()) {
                $hasErrors = true;
                ControleElecteur::create([
                    'numElecteur' => $record['numElecteur'],
                    'numCIN' => $record['numCIN'],
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
            }

            ElecteurTemporaire::truncate();
            DB::commit();

            return response()->json([
                'status' => 'success',
                'description' => 'Données transférées avec succès.'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'description' => 'Erreur de validation : ' . $e->getMessage()
            ]);
        }
    }
}
