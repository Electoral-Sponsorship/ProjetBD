<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parrainage extends Model
{
    //
    public $timestamps = false;
    protected $fillable =[
        "dateDebut",
        "dateFin",
        "etatOuverture",
        "idAdmin"
    ];
}
