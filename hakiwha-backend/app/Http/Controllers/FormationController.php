<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormationController extends Controller
{
    public function index()
    {
        $formations = Formation::with(['formateur', 'client', 'groupes'])->get();
        return response()->json($formations);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'required|string|max:255',
            'categorie' => 'required|string|max:255',
            'formateur_id' => 'required|exists:users,id',
            'client_id' => 'required|exists:clients,id',
            'duree' => 'required|integer',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $formation = Formation::create($request->all());

        return response()->json($formation, 201);
    }

    public function show(Formation $formation)
    {
        return response()->json($formation->load(['formateur', 'client', 'groupes', 'stagiaires']));
    }

    public function update(Request $request, Formation $formation)
    {
        $validator = Validator::make($request->all(), [
            'titre' => 'sometimes|required|string|max:255',
            'categorie' => 'sometimes|required|string|max:255',
            'formateur_id' => 'sometimes|required|exists:users,id',
            'client_id' => 'sometimes|required|exists:clients,id',
            'duree' => 'sometimes|required|integer',
            'date_debut' => 'sometimes|required|date',
            'date_fin' => 'sometimes|required|date|after:date_debut',
            'description' => 'nullable|string',
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

    public function addStagiaires(Request $request, Formation $formation)
    {
        $validator = Validator::make($request->all(), [
            'stagiaires' => 'required|array',
            'stagiaires.*' => 'exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $formation->stagiaires()->sync($request->stagiaires);

        return response()->json($formation->load('stagiaires'));
    }
} 