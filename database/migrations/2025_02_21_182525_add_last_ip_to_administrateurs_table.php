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
        Schema::table('administrateurs', function (Blueprint $table) {
            $table->string('last_ip')->nullable()->after('motDePasse'); // Ajout de la colonne
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('administrateurs', function (Blueprint $table) {
            $table->dropColumn('last_ip'); // Suppression de la colonne en cas de rollback
        });
    }
};



