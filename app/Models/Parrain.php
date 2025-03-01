<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Parrain extends Model
{
    //
    use Notifiable;
    public $timestamps = false;
    protected $fillable = [
        "idParrain",
        "numElecteur",
        "dateParrainage",
        "numTel",
        "adresseMail",
        "codevalidation"
    ];

    public function routeNotificationForMail($notification)
    {
        return $this->adresseMail;
    }

    public function foreigner() {
        return $this->belongsTo(Electeur::class, 'numElecteur', 'numElecteur');
    }

}
