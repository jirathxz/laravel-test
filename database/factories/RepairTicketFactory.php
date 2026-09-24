<?php

namespace Database\Factories;

use App\Models\RepairTicket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RepairTicket>
 */
class RepairTicketFactory extends Factory
{
    protected $model = RepairTicket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ticket_number' => RepairTicket::generateTicketNumber(),
            'user_id' => User::factory(),
            'device_type' => fake()->randomElement(['desktop', 'notebook', 'macbook', 'component', 'software']),
            'device_brand' => fake()->randomElement(['ASUS', 'MSI', 'Acer', 'Dell', 'Lenovo', 'Apple', 'HP']),
            'device_model' => fake()->words(2, true),
            'serial_number' => 'SN-'.fake()->bothify('??-####-????'),
            'service_type' => fake()->randomElement(['drop_off', 'pickup']),
            'problem_description' => fake()->paragraph(),
            'symptoms' => ['เปิดไม่ติด', 'เครื่องร้อน'],
            'urgency' => fake()->randomElement(['normal', 'urgent']),
            'customer_name' => fake()->name(),
            'customer_phone' => fake()->numerify('08########'),
            'customer_email' => fake()->safeEmail(),
            'customer_address' => fake()->address(),
            'status' => 'pending',
            'estimated_cost' => fake()->randomFloat(2, 500, 5000),
            'technician_notes' => null,
            'completed_at' => null,
        ];
    }
}
