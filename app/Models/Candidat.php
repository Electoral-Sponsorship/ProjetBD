<?php

namespace App\Models;

use App\Models\Electeur;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Candidat extends Model
{
    //
    
    use Notifiable;
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

    public function electeur() {
        return $this->belongsTo(Electeur::class, 'numElecteur', 'numElecteur');
    }

    public function routeNotificationForMail($notification){
        return $this->adresseMail;
    }
}
