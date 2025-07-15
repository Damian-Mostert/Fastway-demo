<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $casts = [
        'data' => 'json',
    ];
    protected $fillable = [
        'user_id',
        'data',
    ];
}
