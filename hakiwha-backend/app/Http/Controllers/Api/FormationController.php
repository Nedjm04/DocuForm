<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormationController extends Controller
{
    public function index()
    {
        $formations = Formation::with(['client', 'groupes', 'sessions', 'documents'])->get();
        return response()->json($formations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'categorie' => 'required|string|max:255',
            'formateur_nom' => 'required|string|max:255',
            'duree' => 'required|integer',
            'date_d' => 'required|date',
            'client_id' => 'required|exists:clients,id',
            'description' => 'nullable|string',
            'lieu' => 'nullable|string',
            'prix' => 'nullable|numeric',
            'status' => 'required|in:planifiee,en_cours,terminee,annulee'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $formation = Formation::create($request->all());
        return response()->json($formation, 201);
    }

    public function show(Formation $formation)
    {
        $formation->load(['client', 'groupes', 'sessions', 'documents']);
        return response()->json($formation);
    }

    public function update(Request $request, Formation $formation)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|required|string|max:255',
            'categorie' => 'sometimes|required|string|max:255',
            'formateur_nom' => 'sometimes|required|string|max:255',
            'duree' => 'sometimes|required|integer',
            'date_d' => 'sometimes|required|date',
            'client_id' => 'sometimes|required|exists:clients,id',
            'description' => 'nullable|string',
            'lieu' => 'nullable|string',
            'prix' => 'nullable|numeric',
            'status' => 'sometimes|required|in:planifiee,en_cours,terminee,annulee'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $formation->update($request->all());
        return response()->json($formation);
    }

    public function destroy(Formation $formation)
    {
        $formation->delete();
        return response()->json(null, 204);
    }
} 