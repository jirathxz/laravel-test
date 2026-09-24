<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('repair_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_number')->unique()->index();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('device_type');
            $table->string('device_brand');
            $table->string('device_model');
            $table->string('serial_number')->nullable();
            $table->string('service_type')->default('drop_off');
            $table->text('problem_description');
            $table->json('symptoms')->nullable();
            $table->string('urgency')->default('normal');
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_email');
            $table->text('customer_address')->nullable();
            $table->string('status')->default('pending')->index();
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->text('technician_notes')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repair_tickets');
    }
};
