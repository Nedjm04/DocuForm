<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SessionController extends Controller
{
    public function index()
    {
        $sessions = Session::with(['formation', 'group'])->get();
        return response()->json($sessions);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'formation_id' => 'required|exists:formations,id',
            'group_id' => 'required|exists:groups,id',
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'contenu' => 'nullable|string',
            'status' => 'required|in:planifiee,en_cours,terminee,annulee'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $session = Session::create($request->all());
        return response()->json($session, 201);
    }

    public function show(Session $session)
    {
        $session->load(['formation', 'group']);
        return response()->json($session);
    }

    public function update(Request $request, Session $session)
    {
        $validator = Validator::make($request->all(), [
            'formation_id' => 'sometimes|required|exists:formations,id',
            'group_id' => 'sometimes|required|exists:groups,id',
            'date' => 'sometimes|required|date',
            'heure_debut' => 'sometimes|required|date_format:H:i',
            'heure_fin' => 'sometimes|required|date_format:H:i|after:heure_debut',
            'contenu' => 'nullable|string',
            'status' => 'sometimes|required|in:planifiee,en_cours,terminee,annulee'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $session->update($request->all());
        return response()->json($session);
    }

    public function destroy(Session $session)
    {
        $session->delete();
        return response()->json(null, 204);
    }
} 