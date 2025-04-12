<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;

Route::middleware('auth:sanctum')->group(function () {
    // Document generation routes
    Route::prefix('documents')->group(function () {
        Route::post('/presence/{formation}/{group}', [DocumentController::class, 'generatePresenceSheet']);
        Route::post('/certificate/{formation}/{stagiaire}', [DocumentController::class, 'generateCertificate']);
        Route::post('/evaluation/{formation}/{stagiaire}', [DocumentController::class, 'generateEvaluationForm']);
        Route::get('/download/{id}', [DocumentController::class, 'downloadDocument']);
        Route::get('/certificate/download/{id}', [DocumentController::class, 'downloadCertificate']);
    });
}); 