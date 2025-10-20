<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'short_descritpion',
        'description',
        'features',
        'image_path',
        'is_active',
        'sort_order',
        'meta_title',
        'meta_description',
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}