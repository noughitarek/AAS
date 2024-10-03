<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'reference',
        'created_by',
        'updated_by',
        'deleted_by'
    ];
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    
    public function order_products()
    {
        return $this->hasMany(OrderProducts::class);
    }
    public function purshases()
    {
        return $this->hasManyThrough(FundingPurchase::class, Funding::class);
    }
    public function stock()
    {
        return $this->purshases->sum('purchase_quantity') - $this->order_products->sum('quantity');
    }
}
