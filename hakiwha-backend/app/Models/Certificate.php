<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Certificate extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'stagiaire_id',
        'formation_id',
        'url',
        'qr_code',
        'uuid',
        'verified',
        'verified_at'
    ];

    protected $casts = [
        'verified' => 'boolean',
        'verified_at' => 'datetime'
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
