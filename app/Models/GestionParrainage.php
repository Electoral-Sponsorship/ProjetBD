<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GestionParrainage extends Model
{
<<<<<<< HEAD
    protected $table = 'gestionparrainages';
    protected $fillable = ['dateDebut', 'dateFin', 'etatOuverture', 'idAdmin'];

    public function estActive()
    {
        return $this->etatOuverture && now() >= $this->dateDebut && now() <= $this->dateFin;
    }
}




=======
    //
    protected $table = 'gestionparrainages';
    public $timestamps = false;
    protected $fillable =[
        "idCandidat",
        "idAdmin"
    ];
}
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
