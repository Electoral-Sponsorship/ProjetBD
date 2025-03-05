<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ParrainagevalidationMail extends Notification
{
    private $code;
    private $nom;
    private $prenoms;
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($code, $nom, $prenoms)
    {
        //
        $this->code = $code;
        $this->nom = $nom;
        $this->prenoms = $prenoms;
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
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->from('noreply@gestion-parrainage.sn', 'gestion-parraingage')
            ->subject('Code de validation de parrainage')
            ->line('Bonjour ' . $this->nom . ' ' . $this->prenoms)
            ->line("Votre code de validation est: " . $this->code);
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
