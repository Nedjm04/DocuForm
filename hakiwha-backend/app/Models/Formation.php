<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Formation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'titre',
        'categorie',
        'formateur_nom',
        'duree',
        'date_debut',
        'date_fin',
        'client_id',
        'description',
        'lieu',
        'prix',
        'status'
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'prix' => 'decimal:2'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function groups()
    {
        return $this->hasMany(Group::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
