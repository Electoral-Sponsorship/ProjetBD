<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerificationCodeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code; // Variable accessible dans la vue

    /**
     * Crée une nouvelle instance de message.
     */
    public function __construct($code)
    {
        $this->code = $code;
    }

    /**
     * Obtenir l'enveloppe du message.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Code de Vérification - Gestion Parrainage', // Sujet personnalisé
        );
    }

    /**
     * Obtenir la définition du contenu du message.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.verification_code', // Chemin vers votre vue Blade
            with: ['code' => $this->code] // Passage du code à la vue
        );
    }

    /**
     * Obtenir les pièces jointes du message.
     */
    public function attachments(): array
    {
        return [];
    }
}
