<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'title_en' => fake()->words(4, true),
            'title_ar' => fake()->words(4, true),
            'description_en' => fake()->paragraphs(3, true),
            'description_ar' => fake()->paragraphs(3, true),
            'features_en' => fake()->sentences(3, true),
            'features_ar' => fake()->sentences(3, true),
            'is_active' => fake()->boolean(80),
            'sort_order' => fake()->numberBetween(1, 100),
            'meta_title' => fake()->words(6, true),
            'meta_description' => fake()->sentence(),
            'image_path' => null,
        ];
    }
}