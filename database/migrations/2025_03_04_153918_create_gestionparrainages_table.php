<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGestionparrainagesTable extends Migration
{
    public function up()
    {
        Schema::create('gestionparrainages', function (Blueprint $table) {
            $table->id('idGestion');
            $table->date('dateDebut');
            $table->date('dateFin');
            $table->boolean('etatOuverture')->default(false);
            $table->foreignId('idAdmin')->constrained('Administrateurs', 'idAdmin');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('gestionparrainages');
    }
}


