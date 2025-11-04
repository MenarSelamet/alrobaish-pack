<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_en' => fake()->words(3, true),
            'name_ar' => fake()->words(3, true),
            'slug_en' => fake()->unique()->slug(),
            'slug_ar' => fake()->unique()->slug(),
            'description_en' => fake()->paragraph(),
            'description_ar' => fake()->paragraph(),
            'is_active' => fake()->boolean(80), 
            'sort_order' => fake()->numberBetween(1, 100),
        ];
    }
}