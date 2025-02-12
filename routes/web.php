<?php

use Illuminate\Support\Facades\Route;

Route::get('/createTest', function () {
//    \App\Models\ElecteurTemporaire::create([
//        "numElecteur" => "dd",
//        "numCIN"=> "23",
//        "nom" => "Doe",
//        "prenoms" => "John",
//        "dateNaissance" => "1990-12-02",
//        "lieuNaissance" => "edd",
//        "sexe" => "Masculin"
//    ]);

//    \App\Models\Administrateur::create([
//        "adresseMail" => "admin@gmail.com",
//        "motDePasse" => "password",
//    ]);
//
//    \App\Models\Parrainage::create([
//        "dateDebut" => "1985-12-01",
//        "dateFin" => "1985-12-02",
//        "etatOuverture" => true,
//        "idAdmin" => "1"
//    ]);
//
//    \App\Models\ControleElecteur::create([
//        'idAdmin' => "12",
//        'NumElecteur' => "544",
//        'NumCIN' => "dd5555",
//        'NatureProbleme'=>"Probleme"
//    ]);
    return [
        \App\Models\Parrainage::all(),
        \App\Models\ElecteurTemporaire::all(),
        \App\Models\ControleElecteur::all(),
    ];
});
