<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Administrateur extends Authenticatable{
    use HasApiTokens, Notifiable;
    protected $primaryKey = 'idAdmin';
    public $timestamps = false;

    protected $fillable = [
        "adresseMail",
        "motDePasse",
        "last_ip", // Ajout de l'adresse IP
    ];

    protected $hidden = [
        "motDePasse",
    ];

    /**
     * Spécifie à Laravel que le champ "adresseMail" est l'email utilisé pour l'authentification
     */
    public function getAuthIdentifierName(): string
    {
        return 'adresseMail';
    }

    /**
     * Spécifie à Laravel que le champ "motDePasse" est le mot de passe utilisé pour l'authentification
     */
    public function getAuthPassword(): string
    {
        return $this->motDePasse;
    }

    /**
     * Override la méthode boot pour hasher le mot de passe uniquement lors de la création
     */
    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($admin) {
            $admin->motDePasse = bcrypt($admin->motDePasse);
        });
    }
}


