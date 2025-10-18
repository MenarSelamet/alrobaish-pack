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
            'title' => fake()->words(4, true),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(),
            'features' => fake()->sentences(3, true),
            'is_active' => fake()->boolean(80),
            'sort_order' => fake()->numberBetween(1, 100),
            'meta_title' => fake()->words(6, true),
            'meta_description' => fake()->sentence(),
            'image_path' => null,
        ];
    }
}
