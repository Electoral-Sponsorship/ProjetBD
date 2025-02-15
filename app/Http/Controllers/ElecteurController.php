<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use League\Csv\Reader;
use Illuminate\Support\Facades\Validator;
use App\Models\Electeur;


class ElecteurController extends Controller
{

    public function calculateChecksum(Request $request)
    {
        // Validation du fichier
        $request->validate([
            'file' => 'required|file|mimes:csv,txt', // Modifier les types selon besoin
        ]);

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
        // 1. Validation du fichier envoyé
        $request->validate([
            'csv_file' => 'required|file|mimes:csv,txt',
        ]);

        try {
            $csv = Reader::createFromPath($request->file('electoral_file')->getRealPath(), 'r');
//            $csvPath = 'C:\\Users\\latee\\Downloads\\electeurs.csv';
//            $csv = Reader::createFromPath($csvPath, 'r');
            $csv->setHeaderOffset(0);

            $imported=0;
            foreach ($csv->getRecords() as $record) {
                Electeur::create([
                    'numElecteur' => $record['numElecteur'],
                    'numCIN' => $record['numCIN'],
                    'nom' => $record['nom'],
                    'prenoms' => $record['prenoms'],
                    'dateNaissance' => $record['dateNaissance'],
                    'lieuNaissance' => $record['lieuNaissance'],
                    'sexe' => $record['sexe']
                ]);
                $imported++;
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Importation réussie !',
                'imported_count' => $imported,
            ], 200);
        } catch (\Exception $e) {
            // Gestion d'une erreur inattendue lors du traitement
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de l\'importation : ' . $e->getMessage(),
            ], 500);
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
