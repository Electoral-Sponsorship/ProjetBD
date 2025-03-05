<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('parrains', function (Blueprint $table) {
            $table->id('idParrain'); // Définition de la clé primaire personnalisée
            $table->string('num_carte_electeur')->unique();
            $table->string('num_bureau_vote');
            $table->date('date_parrainage')->nullable();
            $table->string('telephone')->unique()->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('code_auth')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps(); // Active `created_at` et `updated_at`
        });
    }

    public function down()
    {
        Schema::dropIfExists('parrains');
    }
};
