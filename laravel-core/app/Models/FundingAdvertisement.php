<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FundingAdvertisement extends Model
{
    use HasFactory;
    protected $fillable = [
        'advertisement_amount',
        'funding_id',
        'day'
    ];
}
