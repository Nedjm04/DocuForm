<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'formation_id',
        'group_id',
        'date',
        'heure_debut',
        'heure_fin',
        'contenu',
        'status'
    ];

    protected $casts = [
        'date' => 'date',
        'heure_debut' => 'datetime',
        'heure_fin' => 'datetime'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
