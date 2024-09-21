<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funding extends Model
{
    use HasFactory;
    protected $fillable = [
        'total_amount',
        'type',
        'investor_percentage',
        'products_percentage',
        'products_part',
        'advertising_percentage',
        'advertising_part',
        'workers_percentage',
        'workers_part',
        'product_id',
        'desk_id',
        'investor_id',
        'created_by',
        'updated_by',
        'deleted_by',
        'confirmed_at'
    ];
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function investor()
    {
        return $this->belongsTo(Investor::class);
    }
    public function desk()
    {
        return $this->belongsTo(Desk::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function deletedBy()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
    public function purchases()
    {
        return $this->hasMany(FundingPurchase::class);
    }
    public function advertisements()
    {
        return $this->hasMany(FundingAdvertisement::class);
    }
}
