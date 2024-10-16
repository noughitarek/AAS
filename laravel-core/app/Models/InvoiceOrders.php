<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceOrders extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'phone',
        'phone2',
        'address',
        'commune_id',
        'order_id',
        'total_price',
        'delivery_price',
        'clean_price',
        'recovered',
        'tracking',
        'stopdesk',
        'invoice_id',
        'facebook_conversation_id',
        'products',
        'reference',
        'delivery_extra',
        'desk_extra'
    ];
}
