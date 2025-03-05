<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParrainageRequest;
use App\Models\Parrainage;
use Illuminate\Http\Request;

class ParrainageController extends Controller
{
    /**
     * Enregistrer un parrainage.
     */
    public function store(StoreParrainageRequest $request)
    {
        $parrainage = Parrainage::create([
            'idParrain' => $request->idParrain,
            'dateParrainage' => now(),
        ]);

        return response()->json([
            'message' => 'Parrainage enregistré avec succès.',
            'data' => $parrainage
        ], 201);
    }

    /**
     * Lister tous les parrainages.
     */
    public function index()
    {
        $parrainages = Parrainage::with('parrain')->get();

        return response()->json($parrainages);
    }
}

