<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::with(['stagiaire', 'formation'])->get();
        return response()->json($certificates);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stagiaire_id' => 'required|exists:stagiaires,id',
            'formation_id' => 'required|exists:formations,id',
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $file = $request->file('file');
        $path = $file->store('certificates', 'public');
        $uuid = Str::uuid();

        $certificate = Certificate::create([
            'stagiaire_id' => $request->stagiaire_id,
            'formation_id' => $request->formation_id,
            'url' => $path,
            'uuid' => $uuid,
            'verified' => false
        ]);

        return response()->json($certificate, 201);
    }

    public function show(Certificate $certificate)
    {
        $certificate->load(['stagiaire', 'formation']);
        return response()->json($certificate);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validator = Validator::make($request->all(), [
            'stagiaire_id' => 'sometimes|required|exists:stagiaires,id',
            'formation_id' => 'sometimes|required|exists:formations,id',
            'file' => 'sometimes|required|file|max:10240',
            'verified' => 'sometimes|required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->hasFile('file')) {
            // Delete old file
            Storage::disk('public')->delete($certificate->url);
            
            // Store new file
            $file = $request->file('file');
            $path = $file->store('certificates', 'public');
            $certificate->url = $path;
        }

        $certificate->update($request->except('file'));
        return response()->json($certificate);
    }

    public function destroy(Certificate $certificate)
    {
        Storage::disk('public')->delete($certificate->url);
        $certificate->delete();
        return response()->json(null, 204);
    }

    public function download(Certificate $certificate)
    {
        return Storage::disk('public')->download($certificate->url);
    }

    public function verify($uuid)
    {
        $certificate = Certificate::where('uuid', $uuid)->firstOrFail();
        $certificate->verified = true;
        $certificate->verified_at = now();
        $certificate->save();

        return response()->json([
            'message' => 'Certificate verified successfully',
            'certificate' => $certificate->load(['stagiaire', 'formation'])
        ]);
    }

    public function getByStagiaire($stagiaireId)
    {
        $certificates = Certificate::with('formation')
            ->where('stagiaire_id', $stagiaireId)
            ->get();
        return response()->json($certificates);
    }

    public function getByFormation($formationId)
    {
        $certificates = Certificate::with('stagiaire')
            ->where('formation_id', $formationId)
            ->get();
        return response()->json($certificates);
    }
} 