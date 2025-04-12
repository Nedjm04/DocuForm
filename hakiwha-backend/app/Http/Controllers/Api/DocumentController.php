<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::with('formation')->get();
        return response()->json($documents);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|in:fiche_presence,decharge_support,appreciation_formateur,deroulement_pedagogique,evaluation_chaud,liste_formations_souhaitees,liste_participants,certificat',
            'formation_id' => 'required|exists:formations,id',
            'file' => 'required|file|max:10240', // 10MB max
            'metadata' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $file = $request->file('file');
        $path = $file->store('documents', 'public');

        $document = Document::create([
            'type' => $request->type,
            'formation_id' => $request->formation_id,
            'url' => $path,
            'metadata' => $request->metadata
        ]);

        return response()->json($document, 201);
    }

    public function show(Document $document)
    {
        $document->load('formation');
        return response()->json($document);
    }

    public function update(Request $request, Document $document)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|required|in:fiche_presence,decharge_support,appreciation_formateur,deroulement_pedagogique,evaluation_chaud,liste_formations_souhaitees,liste_participants,certificat',
            'formation_id' => 'sometimes|required|exists:formations,id',
            'file' => 'sometimes|required|file|max:10240',
            'metadata' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->hasFile('file')) {
            // Delete old file
            Storage::disk('public')->delete($document->url);
            
            // Store new file
            $file = $request->file('file');
            $path = $file->store('documents', 'public');
            $document->url = $path;
        }

        $document->update($request->except('file'));
        return response()->json($document);
    }

    public function destroy(Document $document)
    {
        Storage::disk('public')->delete($document->url);
        $document->delete();
        return response()->json(null, 204);
    }

    public function download(Document $document)
    {
        return Storage::disk('public')->download($document->url);
    }
} 