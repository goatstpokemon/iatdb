<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'name', 'price', 'description', 'product', 'rentable', 'return_date', 'rental_started', 'rented_by', 'returned', 'product_image', 'category', 'type', 'size'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function rentedBy()
    {
        return $this->belongsTo(User::class, 'rented_by');
    }
    public function getPhotoUrlAttribute()
    {
        return $this->attributes['photo'] ? asset($this->attributes['photo']) : asset('img/no-image.png');
    }
    public function lendings()
    {
        return $this->hasMany(Lending::class);
    }
}
