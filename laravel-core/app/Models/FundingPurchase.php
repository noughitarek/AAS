<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundingPurchase extends Model
{
    use HasFactory;
    protected $fillable = [
        'purchase_amount',
        'purchase_quantity',
        'funding_id',
        'purchased_at'
    ];
}
