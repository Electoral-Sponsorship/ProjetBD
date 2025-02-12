<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Electeur extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        "numElecteur",
        "numCIN",
        "nom",
        "prenoms",
        "dateNaissance",
        "lieuNaissance",
        "sexe"
    ];
}
