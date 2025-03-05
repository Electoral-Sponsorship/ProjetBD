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
        Schema::create('parrainages', function (Blueprint $table) {
            $table->id('idParrainage'); // Clé primaire
            $table->unsignedBigInteger('idParrain'); // Clé étrangère vers parrains
            $table->date('dateParrainage')->nullable();
            $table->timestamps();

            // Définition des relations
            $table->foreign('idParrain')->references('idParrain')->on('parrains')->onDelete('cascade');
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


