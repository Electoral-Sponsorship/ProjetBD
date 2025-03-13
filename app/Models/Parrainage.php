<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Parrainage extends Model {
    //
    protected $table = 'parrainages';
    public $timestamps = false;
    protected $fillable =[
        "idCandidat",
        "idParrain",
        "dateParrainage"
    ];

    public function parrain()
    {
        return $this->belongsTo(Parrain::class, 'idParrain', 'idParrain');
    }
}

