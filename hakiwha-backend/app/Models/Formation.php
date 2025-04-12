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
        'date_d',
        'client_id',
    ];

    protected $casts = [
        'date_d' => 'datetime',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function groupes()
    {
        return $this->hasMany(Groupe::class);
    }

    public function session()
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

    public function certificats()
    {
        return $this->hasMany(Certificat::class);
    }
}
