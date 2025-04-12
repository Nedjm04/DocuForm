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
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('categorie');
            $table->string('formateur_nom');
            $table->integer('duree');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->string('lieu')->nullable();
            $table->decimal('prix', 10, 2)->nullable();
            $table->enum('status', ['planifiee', 'en_cours', 'terminee', 'annulee'])->default('planifiee');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
