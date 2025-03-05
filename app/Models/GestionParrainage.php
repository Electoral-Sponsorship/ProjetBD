<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GestionParrainage extends Model
{
    protected $table = 'gestionparrainages';
    protected $fillable = ['dateDebut', 'dateFin', 'etatOuverture', 'idAdmin'];

    public function estActive()
    {
        return $this->etatOuverture && now() >= $this->dateDebut && now() <= $this->dateFin;
    }
}




