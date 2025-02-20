<?php

namespace App\Http\Controllers;

use App\Models\ElecteurTemporaire;
use App\Models\Historisation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\UploadedFile;
use League\Csv\Reader;
use Illuminate\Support\Facades\Validator;
use App\Models\Electeur;
use Mockery\Exception;


class ElecteurController extends Controller
{

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
            return response()->json([
                'status' => 'error',
                'message' => "Impossible d'insérer les données",
                'description' => $e->getMessage(),
            ]);
        }
    }

    public function checkElectoralFile(Request $request)
    {
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

        try {
            $checksum = $request->input('checksum');
            $jsonData = $this->calculateChecksum($request)->getData(true);

            if ($jsonData['status'] == 'success') {
//                dd($jsonData['checksum']);
//                dd($jsonData['checksum'],$checksum);
                if ($jsonData['checksum'] == $checksum) {
                    try {
                        $importResponse = $this->importElectoralFile($request)->getData(true);

//                        dd($importResponse);
                        if ($importResponse['status'] == 'success') {

                            // Appel de la fonction du controle des électeurs


                            //Retour à supprimer après test
                            return response()->json([
                                'status' => 'success',
                                'message' => "Fichier importé avec succès !"
                            ]);
                        }
                    }catch (\Exception $e) {
                        return response()->json([
                            'status' => 'error',
                            'message' => $e->getMessage()
                        ]);
                    }

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
            return response()->json([
                'status' => 'error',
                'description' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display a listing of the resource.
     */
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
