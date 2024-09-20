<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundingWorkerPayment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'paid_amount',
        'funding_id',
        'purchased_at',
    ];

}
