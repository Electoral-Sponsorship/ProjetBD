<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidat extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        "idCandidat",
        "numElecteur",
        "numTel",
        "adresseMail",
        "nomParti",
        "slogan",
        "couleurs",
        "urlPageInfo"
    ];
}
