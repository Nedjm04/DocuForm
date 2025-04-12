<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Evaluation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'stagiaire_id',
        'formation_id',
        'reponses_json',
        'commentaires',
        'note_globale',
        'completed'
    ];

    protected $casts = [
        'reponses_json' => 'array',
        'completed' => 'boolean'
    ];

    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
