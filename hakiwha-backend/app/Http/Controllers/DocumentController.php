<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\Stagiaire;
use App\Models\Group;
use App\Services\PdfService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected $pdfService;

    public function __construct(PdfService $pdfService)
    {
        $this->pdfService = $pdfService;
    }

    public function generatePresenceSheet(Formation $formation, Group $group)
    {
        $document = $this->pdfService->generatePresenceSheet($formation, $group);
        return response()->json([
            'message' => 'Fiche de présence générée avec succès',
            'document' => $document
        ]);
    }

    public function generateCertificate(Formation $formation, Stagiaire $stagiaire)
    {
        $certificate = $this->pdfService->generateCertificate($stagiaire, $formation);
        return response()->json([
            'message' => 'Certificat généré avec succès',
            'certificate' => $certificate
        ]);
    }

    public function generateEvaluationForm(Formation $formation, Stagiaire $stagiaire)
    {
        $document = $this->pdfService->generateEvaluationForm($formation, $stagiaire);
        return response()->json([
            'message' => 'Formulaire d\'évaluation généré avec succès',
            'document' => $document
        ]);
    }

    public function downloadDocument($id)
    {
        $document = Document::findOrFail($id);
        return Storage::download($document->url);
    }

    public function downloadCertificate($id)
    {
        $certificate = Certificate::findOrFail($id);
        return Storage::download($certificate->url);
    }
} 