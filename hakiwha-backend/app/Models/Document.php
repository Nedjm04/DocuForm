<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'formation_id',
        'url',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
