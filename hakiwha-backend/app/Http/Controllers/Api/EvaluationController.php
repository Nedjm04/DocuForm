<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EvaluationController extends Controller
{
    public function index()
    {
        $evaluations = Evaluation::with(['stagiaire', 'formation'])->get();
        return response()->json($evaluations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stagiaire_id' => 'required|exists:stagiaires,id',
            'formation_id' => 'required|exists:formations,id',
            'reponses_json' => 'required|array',
            'commentaires' => 'nullable|string',
            'note_globale' => 'nullable|integer|min:0|max:100',
            'completed' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $evaluation = Evaluation::create($request->all());
        return response()->json($evaluation, 201);
    }

    public function show(Evaluation $evaluation)
    {
        $evaluation->load(['stagiaire', 'formation']);
        return response()->json($evaluation);
    }

    public function update(Request $request, Evaluation $evaluation)
    {
        $validator = Validator::make($request->all(), [
            'stagiaire_id' => 'sometimes|required|exists:stagiaires,id',
            'formation_id' => 'sometimes|required|exists:formations,id',
            'reponses_json' => 'sometimes|required|array',
            'commentaires' => 'nullable|string',
            'note_globale' => 'nullable|integer|min:0|max:100',
            'completed' => 'sometimes|required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $evaluation->update($request->all());
        return response()->json($evaluation);
    }

    public function destroy(Evaluation $evaluation)
    {
        $evaluation->delete();
        return response()->json(null, 204);
    }

    public function getByFormation($formationId)
    {
        $evaluations = Evaluation::with('stagiaire')
            ->where('formation_id', $formationId)
            ->get();
        return response()->json($evaluations);
    }

    public function getByStagiaire($stagiaireId)
    {
        $evaluations = Evaluation::with('formation')
            ->where('stagiaire_id', $stagiaireId)
            ->get();
        return response()->json($evaluations);
    }
} 