<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Desk extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'reference',
        'from_stock',
        'ecotrack_idf',
        'ecotrack_token',
        'created_by',
        'updated_by',
        'deleted_by',

    ];
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
