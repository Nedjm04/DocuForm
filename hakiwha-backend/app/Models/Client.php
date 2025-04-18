<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'raison_sociale',
        'address',
        'phone',
        'email',
        'contact_person',
        'notes'
    ];

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }
}
