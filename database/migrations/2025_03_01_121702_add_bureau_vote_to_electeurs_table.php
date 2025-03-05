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
<<<<<<<< HEAD:database/migrations/2025_03_02_111827_add_authentification_code.php
        Schema::table('candidats', function (Blueprint $table) {
            $table->integer('codeAuth')->nullable()->after('photo');
========
        Schema::table('electeurs', function (Blueprint $table) {
            //
            $table->string('bureauVote')->nullable();
>>>>>>>> 5a24a737bcd1b95b25f4943eeb91bb18cfac12cf:database/migrations/2025_03_01_121702_add_bureau_vote_to_electeurs_table.php
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
<<<<<<<< HEAD:database/migrations/2025_03_02_111827_add_authentification_code.php
        Schema::table('candidats', function (Blueprint $table) {
            $table->dropColumn('codeAuth');
========
        Schema::table('electeurs', function (Blueprint $table) {
            //
            $table->dropColumn('bureauVote');
>>>>>>>> 5a24a737bcd1b95b25f4943eeb91bb18cfac12cf:database/migrations/2025_03_01_121702_add_bureau_vote_to_electeurs_table.php
        });
    }
};
