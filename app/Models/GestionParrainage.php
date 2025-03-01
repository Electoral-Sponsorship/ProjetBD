<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GestionParrainage extends Model
{
    //
    protected $table = 'gestionparrainages';
    public $timestamps = false;
    protected $fillable =[
        "idCandidat",
        "idAdmin"
    ];
}
