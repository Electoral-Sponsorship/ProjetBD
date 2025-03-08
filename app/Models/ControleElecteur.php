<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ControleElecteur extends Model
{
    //
    protected $table = 'controle_electeurs';
    public $timestamps = false;
    protected $fillable = [
        'NumTentative',
        'idAdmin',
        'NumElecteur',
        'NumCIN',
        'NatureProbleme'
    ];
}

