<?php

use App\Models\RepairTicket;
use App\Models\User;

test('repair index page can be rendered', function () {
    $response = $this->get(route('repairs.index'));

    $response->assertOk();
});

test('repair create form can be rendered', function () {
    $response = $this->get(route('repairs.create'));

    $response->assertOk();
});

test('user can submit a new repair request ticket', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('repairs.store'), [
        'device_type' => 'notebook',
        'device_brand' => 'ASUS',
        'device_model' => 'ROG Strix G16',
        'serial_number' => 'SN-12345678',
        'service_type' => 'drop_off',
        'problem_description' => 'พัดลมหมุนเสียงดังมาก ความร้อนขึ้น 95 องศาเซลเซียส',
        'symptoms' => ['เครื่องร้อนจัด / พัดลมหมุนเสียงดัง'],
        'urgency' => 'urgent',
        'customer_name' => 'วิชัย ช่างคอม',
        'customer_phone' => '0891234567',
        'customer_email' => 'wichai@example.com',
        'customer_address' => '123 ถ.สุขุมวิท กรุงเทพฯ',
    ]);

    $this->assertDatabaseHas('repair_tickets', [
        'device_brand' => 'ASUS',
        'device_model' => 'ROG Strix G16',
        'customer_phone' => '0891234567',
        'status' => 'pending',
    ]);

    $ticket = RepairTicket::where('customer_phone', '0891234567')->first();
    $response->assertRedirect(route('repairs.show', $ticket->ticket_number));
});

test('repair ticket details page can be viewed', function () {
    $ticket = RepairTicket::factory()->create();

    $response = $this->get(route('repairs.show', $ticket->ticket_number));

    $response->assertOk();
});

test('user can track repair ticket with ticket number', function () {
    $ticket = RepairTicket::factory()->create();

    $response = $this->post(route('repairs.track'), [
        'ticket_number' => $ticket->ticket_number,
    ]);

    $response->assertRedirect(route('repairs.show', $ticket->ticket_number));
});

test('user can advance repair ticket status for demo', function () {
    $ticket = RepairTicket::factory()->create([
        'status' => 'pending',
    ]);

    $response = $this->post(route('repairs.advance-status', $ticket));

    $ticket->refresh();
    expect($ticket->status)->toBe('inspecting');
    $response->assertRedirect();
});
