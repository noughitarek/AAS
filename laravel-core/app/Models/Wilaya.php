<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wilaya extends Model
{
    use HasFactory;

    public function communes()
    {
        return $this->hasMany(Commune::class);
    }
}
