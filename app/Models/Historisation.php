<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historisation extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        "idHistorisation",
        "idAdmin",
        "adresseIp",
        "dateHistorisation",
        "clef"
    ];
}
