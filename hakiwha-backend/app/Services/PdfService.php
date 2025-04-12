<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use App\Models\Document;
use App\Models\Formation;
use App\Models\Stagiaire;
use App\Models\Certificate;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PdfService
{
    public function generatePresenceSheet(Formation $formation, $group)
    {
        $pdf = Pdf::loadView('pdf.presence', [
            'formation' => $formation,
            'group' => $group,
            'stagiaires' => $group->stagiaires
        ]);

        $filename = "presence_{$formation->id}_{$group->id}.pdf";
        $path = "documents/{$filename}";
        
        Storage::put($path, $pdf->output());

        return Document::create([
            'type' => 'fiche_presence',
            'formation_id' => $formation->id,
            'url' => $path,
            'metadata' => ['group_id' => $group->id]
        ]);
    }

    public function generateCertificate(Stagiaire $stagiaire, Formation $formation)
    {
        $certificate = Certificate::create([
            'stagiaire_id' => $stagiaire->id,
            'formation_id' => $formation->id,
            'uuid' => \Str::uuid(),
            'verified' => false
        ]);

        $qrCode = QrCode::size(200)->generate(route('certificate.verify', $certificate->uuid));

        $pdf = Pdf::loadView('pdf.certificate', [
            'stagiaire' => $stagiaire,
            'formation' => $formation,
            'certificate' => $certificate,
            'qrCode' => $qrCode
        ]);

        $filename = "certificate_{$certificate->id}.pdf";
        $path = "certificates/{$filename}";
        
        Storage::put($path, $pdf->output());

        $certificate->update([
            'url' => $path,
            'qr_code' => $qrCode
        ]);

        return $certificate;
    }

    public function generateEvaluationForm(Formation $formation, Stagiaire $stagiaire)
    {
        $pdf = Pdf::loadView('pdf.evaluation', [
            'formation' => $formation,
            'stagiaire' => $stagiaire
        ]);

        $filename = "evaluation_{$formation->id}_{$stagiaire->id}.pdf";
        $path = "documents/{$filename}";
        
        Storage::put($path, $pdf->output());

        return Document::create([
            'type' => 'evaluation_chaud',
            'formation_id' => $formation->id,
            'url' => $path,
            'metadata' => ['stagiaire_id' => $stagiaire->id]
        ]);
    }
} 