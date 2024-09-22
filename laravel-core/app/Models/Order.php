<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'phone',
        'phone2',
        'address',
        'commune_id',
        'total_price',
        'delivery_fee',
        'clean_price',
        'tracking',
        'intern_tracking',
        'fragile',
        'stopdesk',
        'desk_id',
        'funding_id',
        'validated_at',
        'shipped_at',
        'wilaya_at',
        'delivery_at',
        'delivered_at',
        'ready_at',
        'recovered_at',
        'returned_at',
        'returned_ready_at',
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
    public function deletedBy()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
    public function desk()
    {
        return $this->belongsTo(Desk::class);
    }
    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }
    public function orderProducts()
    {
        return $this->hasMany(OrderProducts::class);
    }
}
