<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Artisan;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Artisan::call('storage:link');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: This is a one-way migration
        // The storage link will need to be manually removed if needed
    }
}; 