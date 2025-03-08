<?php

namespace App\Models;

use App\Models\Parrain;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Electeur extends Model
{
    use HasFactory; // Permet l'utilisation de factories

    public $timestamps = false; // Désactiver les timestamps (si pas de `created_at` et `updated_at`)

    protected $table = 'electeurs'; // Nom explicite de la table

    protected $primaryKey = 'numElecteur'; // Définir la clé primaire

    public $incrementing = false; // Indiquer que la clé primaire n'est pas auto-incrémentée

    protected $keyType = 'string'; // Spécifier que `numElecteur` est une chaîne de caractères

    protected $fillable = [
        "numElecteur",
        "numCIN",
        "nom",
        "prenoms",
        "dateNaissance",
        "lieuNaissance",
        "sexe",
        "bureauVote"
    ];
}


