<?php

namespace App\Http\Controllers;

use App\Models\Parrainage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        ]);

        // Vérifier si la validation a échoué
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'description' => $validator->errors()
            ], 400);
        }

        try {
            Parrainage::create([
                'dateDebut' => $request->input('dateDebut'),
                'dateFin' => $request->input('dateFin'),
                'etatOuverture' => true, // Etat "ouvert" est true
                'idAdmin' => '',
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
