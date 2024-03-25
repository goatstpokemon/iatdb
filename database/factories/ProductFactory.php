<?php

namespace Database\Factories;

use App\Http\Controllers\User;
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
            'user_id' => User::all()->random()->id,
            'name' => $this->faker->unique()->sentence(),
            'description' => $this->faker->text(),
            'product_image' => $this->faker->image(null, 360, 360, 'animals', true, true, 'cats', true, 'jpg'),
            'rentable' => $this->faker->randomElement([true, false]),
            'return_date' => $this->faker->dateTime(),
            'rental_started' => $this->faker->dateTime(),
            'rented_by' => User::all()->random()->id,
        ];
    }
}
