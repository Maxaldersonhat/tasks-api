<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calculation extends Model
{
    protected $fillable = ['a', 'b', 'operation', 'result'];

    protected $casts = [
        'a' => 'decimal:2',
        'b' => 'decimal:2',
        'result' => 'decimal:2',
        'created_at' => 'datetime',
    ];
}
