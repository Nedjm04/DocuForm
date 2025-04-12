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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->enum('type', [
                'fiche_presence',
                'decharge_support',
                'appreciation_formateur',
                'deroulement_pedagogique',
                'evaluation_chaud',
                'liste_formations_souhaitees',
                'liste_participants',
                'certificat'
            ]);
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->string('url')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
