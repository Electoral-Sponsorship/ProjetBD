<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parrainage extends Model
{
<<<<<<< HEAD
    use HasFactory;

    protected $table = 'parrainages'; // Définition du nom de la table

    protected $primaryKey = 'idParrainage'; // Définition de la clé primaire

    protected $fillable = [
        'idParrain',
        'dateParrainage',
=======
    //
    protected $table = 'parrainages';
    public $timestamps = false;
    protected $fillable =[
        "dateDebut",
        "dateFin",
        "etatOuverture",
        "idAdmin"
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4
    ];

    /**
     * Relation avec la table `parrains`
     */
    public function parrain()
    {
        return $this->belongsTo(Parrain::class, 'idParrain', 'idParrain');
    }
}
