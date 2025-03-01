<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CandidatMail extends Notification
{
    use Queueable;

    public $code;
    public $prenom;
    public $nom;

    /**
     * Create a new notification instance.
     */
    public function __construct($code, $prenom, $nom){
        $this->code = $code;
        $this->prenom = $prenom;
        $this->nom = $nom;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage{
        return (new MailMessage)
            ->from('noreply@gestion-parrainage.sn', 'gestion-parraingage')
            ->subject('Votre code de securite')
            ->greeting('Bonjour ' . $this->prenom . ' ' . $this->nom)
            ->line('Votre inscription a été  validée avec succès.')
            ->line('**Voici votre code de sécurite : ' . $this->code . '**')
            ->line('Ce code est valable pendant 10 minutes. Passé ce délai, vous devrez en demander un nouveau.')
            ->line('Veuillez utiliser ce code pour accéder à votre espace candidat.')
            ->line('Merci d\'utiliser notre application!')
            ->salutation('Cordialement, L\'équipe Gestion Parrainage.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
