<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ElecteurTemporaire extends Model
{
    //
    protected $table = 'electeurs_temporaires';
    public $timestamps = false;
    protected $fillable = [
        "numElecteur",
        "numCIN",
        "nom",
        "prenoms",
        "dateNaissance",
        "lieuNaissance",
        "sexe",
        "bureauVote"
    ];
}
