<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parrainage extends Model
{
    use HasFactory;

    protected $table = 'parrainages'; // Définition du nom de la table

    protected $primaryKey = 'idParrainage'; // Définition de la clé primaire

    protected $fillable = [
        'idParrain',
        'dateParrainage',
    ];

    /**
     * Relation avec la table `parrains`
     */
    public function parrain()
    {
        return $this->belongsTo(Parrain::class, 'idParrain', 'idParrain');
    }
}
