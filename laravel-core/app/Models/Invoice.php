<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'total_amount',
        'total_orders',
        'desk_id',
    ];

    public function Desk()
    {
        return $this->belongsTo(Desk::class);
    }
}
