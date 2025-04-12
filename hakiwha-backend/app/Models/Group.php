<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nom',
        'formation_id',
        'capacite_max',
        'notes'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function stagiaires()
    {
        return $this->hasMany(Stagiaire::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
