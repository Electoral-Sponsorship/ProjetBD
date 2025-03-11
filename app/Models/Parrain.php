<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;


class Parrain extends Model {
    use Notifiable, HasFactory;
    public $timestamps = false;
    protected $table = 'parrains';
    protected $primaryKey = 'idParrain';

    // Colonnes remplissables
    protected $fillable = [

        "idParrain",
        "numElecteur",
//        "dateParrainage",
        "numTel",
        "adresseMail",
        "codevalidation",
        "codeAuthentification"
    ];

    public function routeNotificationForMail($notification)
    {
        return $this->adresseMail;
    }

    public function foreigner() {
        return $this->belongsTo(Electeur::class, 'numElecteur', 'numElecteur');
    }

     public function electeur() {
        return $this->belongsTo(Electeur::class, 'numElecteur', 'numElecteur');
    }
}


