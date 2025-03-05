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
        Schema::table('parrains', function (Blueprint $table) {
            //
            $table->integer('codevalidation')->unique()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('parrains', function (Blueprint $table) {
            //
            $table->dropColumn('codevalidation')->unique()->nullable();
        });
    }
};
