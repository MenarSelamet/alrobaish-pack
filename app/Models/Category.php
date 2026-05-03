<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'is_active',
        'is_featured',
        'sort_order',
        'image_path',
        'banner_path',
        'gallery_paths',
        'sizes_en',
        'sizes_ar',
        'materials_en',
        'materials_ar',
        'features_en',
        'features_ar',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active'     => 'boolean',
            'is_featured'   => 'boolean',
            'sort_order'    => 'integer',
            'gallery_paths' => 'array',
            'sizes_en'      => 'array',
            'sizes_ar'      => 'array',
            'materials_en'  => 'array',
            'materials_ar'  => 'array',
            'features_en'   => 'array',
            'features_ar'   => 'array',
        ];
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class);
    }
}