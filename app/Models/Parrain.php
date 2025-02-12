<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parrain extends Model
{
    //
    public $timestamps = false;
    protected $fillable = [
        "idParrain",
        "numElecteur",
        "numBureauVote",
        "dateParrainage",
        "numTel",
        "adresseMail"
    ];
}
