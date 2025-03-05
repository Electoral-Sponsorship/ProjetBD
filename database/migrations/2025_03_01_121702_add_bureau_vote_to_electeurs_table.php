<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
<<<<<<< HEAD:database/migrations/2025_02_12_115732_create_parrainages.php
        Schema::create('parrainages', function (Blueprint $table) {
            $table->id('idParrainage'); // Clé primaire
            $table->unsignedBigInteger('idParrain'); // Clé étrangère vers parrains
            $table->date('dateParrainage')->nullable();
            $table->timestamps();

            // Définition des relations
            $table->foreign('idParrain')->references('idParrain')->on('parrains')->onDelete('cascade');
=======
        Schema::table('electeurs', function (Blueprint $table) {
            //
            $table->string('bureauVote')->nullable();
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4:database/migrations/2025_03_01_121702_add_bureau_vote_to_electeurs_table.php
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
<<<<<<< HEAD:database/migrations/2025_02_12_115732_create_parrainages.php
        Schema::dropIfExists('parrainages');
=======
        Schema::table('electeurs', function (Blueprint $table) {
            //
            $table->dropColumn('bureauVote');
        });
>>>>>>> f25ae85dd09d04d99590df3bd4b700afbc9136b4:database/migrations/2025_03_01_121702_add_bureau_vote_to_electeurs_table.php
    }
};


