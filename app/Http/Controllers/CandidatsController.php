<?php

namespace App\Http\Controllers;

use App\Models\Candidat;
use App\Models\Electeur;
use Illuminate\Http\Request;
use Symfony\Contracts\Service\Attribute\Required;

class CandidatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        //
    }

    public function verify($numeroElecteur){
        $electeur = Electeur::where('numElecteur', '=', $numeroElecteur)->first();
        if(!$electeur) {
            return response()->json([
                'message' => 'Cet electeur n\'existe pas' 
            ]);
        }
        $candidat = Candidat::where('numElecteur', '=', $numeroElecteur)->first();
        if($candidat) {
            return response()->json([
                'message' => 'Ce candidat existe déjà.' 
            ]);
        }
        return response()->json([
            'message' => 'Cet électeur existe et peut être candidat.' 
        ]);
    }

    public function register(Request $request) {
        $request->validate([
            'numeroElecteur' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'required|email',
            'parti' => 'required|string',
            'slogan' => 'required|string',
            'couleurs' => 'required|string',
            'urlInfo' => 'required|url',
        ]);
        $electeur = Electeur::where('numElecteur', '=', $request->numeroElecteur)->first();
        if(!$electeur) {
            return response()->json([
                'message' => 'Cet electeur n\'existe pas' 
            ]);
        }
        $candidat = Candidat::where('numElecteur', '=', $request->numeroElecteur)->first();
        if($candidat) {
            return response()->json([
                'message' => 'Ce candidat existe déjà.',
            ]);
               
        }
        $candidat = Candidat::create([
            'numElecteur' => $request->numeroElecteur,
            'numTel' => $request->telephone,
            'adresseMail' => $request->email,
            'nomParti' => $request->parti,
            'slogan' => $request->slogan,
            'couleurs' =>  $request->couleurs,
            'urlPageInfo' => $request->urlInfo
        ]);
        return response()->json([
            'message' => 'Candidat enregistré avec succès',
            'candidat' => $candidat 
        ]);
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
