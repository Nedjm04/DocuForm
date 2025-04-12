<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StagiaireController extends Controller
{
    public function index()
    {
        $stagiaires = Stagiaire::with(['group', 'evaluations', 'certificates'])->get();
        return response()->json($stagiaires);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:stagiaires',
            'telephone' => 'nullable|string',
            'fonction' => 'nullable|string',
            'group_id' => 'required|exists:groups,id',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->all();
        $data['password'] = Hash::make($request->password);
        $data['access_token'] = Str::random(60);

        $stagiaire = Stagiaire::create($data);
        return response()->json($stagiaire, 201);
    }

    public function show(Stagiaire $stagiaire)
    {
        $stagiaire->load(['group', 'evaluations', 'certificates']);
        return response()->json($stagiaire);
    }

    public function update(Request $request, Stagiaire $stagiaire)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:stagiaires,email,' . $stagiaire->id,
            'telephone' => 'nullable|string',
            'fonction' => 'nullable|string',
            'group_id' => 'sometimes|required|exists:groups,id',
            'password' => 'sometimes|required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->except('password');
        if ($request->has('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $stagiaire->update($data);
        return response()->json($stagiaire);
    }

    public function destroy(Stagiaire $stagiaire)
    {
        $stagiaire->delete();
        return response()->json(null, 204);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $stagiaire = Stagiaire::where('email', $request->email)->first();

        if (!$stagiaire || !Hash::check($request->password, $stagiaire->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $stagiaire->createToken('stagiaire-token')->plainTextToken;
        return response()->json(['token' => $token, 'stagiaire' => $stagiaire]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
} 