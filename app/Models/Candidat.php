<?php

namespace App\Models;

use App\Models\Electeur;
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
        "urlPageInfo",
        "photo"
    ];

    public function electeur() {
        return $this->belongsTo(Electeur::class, 'numElecteur', 'numElecteur');
    }
}
