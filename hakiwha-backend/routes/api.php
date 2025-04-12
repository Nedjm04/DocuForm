<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\FormationController;
use App\Http\Controllers\Api\StagiaireController;
use App\Http\Controllers\Api\SessionController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\EvaluationController;
use App\Http\Controllers\Api\CertificateController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/stagiaires/login', [StagiaireController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Client routes
    Route::apiResource('clients', ClientController::class);

    // Formation routes
    Route::apiResource('formations', FormationController::class);

    // Stagiaire routes
    Route::apiResource('stagiaires', StagiaireController::class);
    Route::post('/stagiaires/logout', [StagiaireController::class, 'logout']);

    // Session routes
    Route::apiResource('sessions', SessionController::class);

    // Document routes
    Route::apiResource('documents', DocumentController::class);
    Route::get('/documents/{document}/download', [DocumentController::class, 'download']);

    // Evaluation routes
    Route::apiResource('evaluations', EvaluationController::class);
    Route::get('/formations/{formationId}/evaluations', [EvaluationController::class, 'getByFormation']);
    Route::get('/stagiaires/{stagiaireId}/evaluations', [EvaluationController::class, 'getByStagiaire']);

    // Certificate routes
    Route::apiResource('certificates', CertificateController::class);
    Route::get('/certificates/{certificate}/download', [CertificateController::class, 'download']);
    Route::get('/certificates/verify/{uuid}', [CertificateController::class, 'verify']);
    Route::get('/stagiaires/{stagiaireId}/certificates', [CertificateController::class, 'getByStagiaire']);
    Route::get('/formations/{formationId}/certificates', [CertificateController::class, 'getByFormation']);
}); 