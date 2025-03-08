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
        Schema::table('parrainages', function (Blueprint $table) {
            $table->date('dateParrainage')->nullable()->after('idCandidat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('parrainages', function (Blueprint $table) {
            $table->dropColumn('dateParrainage');
        });
    }
};
