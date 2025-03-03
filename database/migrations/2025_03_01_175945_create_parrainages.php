<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('parrainages', function (Blueprint $table) {
            // Changer idParrain pour bigInteger et idCandidat pour integer
            $table->bigInteger('idParrain');
            $table->integer('idCandidat'); // Assurez-vous que c'est de type 'int'

            // Définir la clé primaire
            $table->primary(['idParrain', 'idCandidat']);  // Si tu veux que la combinaison soit unique

            // Définition des clés étrangères
            $table->foreign('idParrain')
                ->references('idParrain')
                ->on('parrains')
                ->onDelete('cascade');

            $table->foreign('idCandidat')
                ->references('idCandidat')
                ->on('candidats')
                ->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parrainages');
    }
};
