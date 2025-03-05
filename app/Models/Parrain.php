<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Parrain extends Model
{
    use HasFactory;

    // Nom de la table
    protected $table = 'parrains';

    // Clé primaire
    protected $primaryKey = 'idParrain';

    // Timestamps
    public $timestamps = false;

    // Colonnes remplissables
    protected $fillable = [
        'numElecteur',
        'numBureauVote',
        'dateParrainage',
        'numTel',
        'adresseMail',
        'codeAuthentification'
    ];

    // Relation avec la table Electeurs
    public function electeur(): BelongsTo
    {
        return $this->belongsTo(Electeur::class, 'numElecteur', 'numElecteur');
    }

    // Relation avec la table Parrainages (nouvelle structure)
    public function parrainages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Parrainage::class, 'idParrain', 'idParrain');
    }

    // Relation avec GestionParrainage via Parrainage (optionnel)
    public function periodes()
    {
        return $this->hasManyThrough(
            GestionParrainage::class,
            Parrainage::class,
            'idParrain', // Clé étrangère dans Parrainage
            'idGestion', // Clé étrangère dans GestionParrainage
            'idParrain', // Clé locale dans Parrain
            'idGestion'  // Clé locale dans Parrainage
        );
    }
}


