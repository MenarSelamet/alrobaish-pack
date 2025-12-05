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
        'title_en',
        'title_ar',
        'short_descritpion_en',
        'short_descritpion_ar',
        'description_en',
        'description_ar',
        'features_en',
        'features_ar',
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

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}