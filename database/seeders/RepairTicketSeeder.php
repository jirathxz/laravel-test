<?php

namespace Database\Seeders;

use App\Models\RepairTicket;
use App\Models\User;
use Illuminate\Database\Seeder;

class RepairTicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $tickets = [
            [
                'ticket_number' => 'REP-20260920-0001',
                'user_id' => $user?->id,
                'device_type' => 'notebook',
                'device_brand' => 'ASUS',
                'device_model' => 'ROG Strix G16 (2024)',
                'serial_number' => 'SN-ASUS-9928172',
                'service_type' => 'drop_off',
                'problem_description' => 'เปิดเครื่องติดแต่หน้าจอดำ พัดลมหมุนเสียงดังมาก ต่อจอแยกแล้วภาพไม่ขึ้น',
                'symptoms' => ['เปิดติดไม่ขึ้นภาพ', 'พัดลมหมุนแรงผิดปกติ', 'ความร้อนขึ้นสูง'],
                'urgency' => 'urgent',
                'customer_name' => $user?->name ?? 'สมชาย สปีดคอม',
                'customer_phone' => '0812345678',
                'customer_email' => $user?->email ?? 'somchai@example.com',
                'customer_address' => '99/12 หมู่บ้านนันทวัน ถ.ราชพฤกษ์ บางกรวย นนทบุรี 11130',
                'status' => 'completed',
                'estimated_cost' => 1800.00,
                'technician_notes' => 'ทำความสะอาดฝุ่นในระบบระบายความร้อน เปลี่ยนซิลิโคน Thermal Grizzly Kryonaut และแฟลช BIOS เวอร์ชันล่าสุด ทดสอบ Stress Test อุณหภูมิกลับมาปกติ 68 องศาเซลเซียส พร้อมส่งมอบ',
                'completed_at' => now()->subDay(),
                'created_at' => now()->subDays(4),
            ],
            [
                'ticket_number' => 'REP-20260922-0002',
                'user_id' => $user?->id,
                'device_type' => 'desktop',
                'device_brand' => 'Custom PC',
                'device_model' => 'Intel Core i7-14700K + RTX 4070 Ti Super',
                'serial_number' => null,
                'service_type' => 'pickup',
                'problem_description' => 'เล่นเกมกราฟิกหนักๆ ประมาณ 15 นาทีแล้วเครื่องค้าง มีเสียงบี๊บยาว แล้วดับรีสตาร์ทเอง',
                'symptoms' => ['เครื่องค้าง/ดับเอง', 'มีเสียงเตือนจากเมนบอร์ด', 'ไฟไม่พอ'],
                'urgency' => 'normal',
                'customer_name' => $user?->name ?? 'สมชาย สปีดคอม',
                'customer_phone' => '0812345678',
                'customer_email' => $user?->email ?? 'somchai@example.com',
                'customer_address' => '99/12 หมู่บ้านนันทวัน ถ.ราชพฤกษ์ บางกรวย นนทบุรี 11130',
                'status' => 'in_progress',
                'estimated_cost' => 2500.00,
                'technician_notes' => 'ตรวจเช็ครางไฟ 12V พบว่าดรอปลงเหลือ 11.2V ขณะ Full Load เกิดจากรางไฟพาวเวอร์ซัพพลายเสื่อม ช่างกำลังทดสอบเปลี่ยน PSU 850W Gold เพื่อยืนยันผล',
                'completed_at' => null,
                'created_at' => now()->subDays(2),
            ],
            [
                'ticket_number' => 'REP-20260924-0003',
                'user_id' => $user?->id,
                'device_type' => 'macbook',
                'device_brand' => 'Apple',
                'device_model' => 'MacBook Pro 14" M1 Pro (Space Gray)',
                'serial_number' => 'C02G9988MD6R',
                'service_type' => 'drop_off',
                'problem_description' => 'แบตเตอรี่เริ่มบวม ดันแทร็กแพดจนคลิกยาก ชาร์จไฟเต็ม 100% แล้วลดลงอย่างรวดเร็วเหลือ 20% ภายใน 1 ชั่วโมง',
                'symptoms' => ['แบตเตอรี่เสื่อม/บวม', 'แทร็กแพดกดไม่ลง', 'ชาร์จไฟไม่เข้า'],
                'urgency' => 'urgent',
                'customer_name' => 'วิภาดา รุ่งเรือง',
                'customer_phone' => '0898765432',
                'customer_email' => 'wiphada@example.com',
                'customer_address' => '128 ถ.เพชรเกษม อ.เมือง จ.นครปฐม 73000',
                'status' => 'waiting_parts',
                'estimated_cost' => 4500.00,
                'technician_notes' => 'เบิกอะไหล่ชุดแบตเตอรี่ของแท้ Original Grade สำหรับ MacBook Pro 14" สินค้ากำลังจัดส่งจากคลังสินค้าหลัก คาดว่าจะถึงและเปลี่ยนเสร็จภายใน 2 วันทำการ',
                'completed_at' => null,
                'created_at' => now()->subDay(),
            ],
            [
                'ticket_number' => 'REP-20260924-0004',
                'user_id' => null,
                'device_type' => 'software',
                'device_brand' => 'Lenovo',
                'device_model' => 'IdeaPad Gaming 3',
                'serial_number' => 'PF239109',
                'service_type' => 'drop_off',
                'problem_description' => 'ติดมัลแวร์และไวรัส มีโฆษณาเด้งตลอดเวลา ไฟล์เอกสารถูกเข้ารหัสเป็น .locked ต้องการล้างเครื่องติดตั้ง Windows 11 ลิขสิทธิ์แท้พร้อมกู้ข้อมูลไดรฟ์ D',
                'symptoms' => ['ติดไวรัส/มัลแวร์', 'เครื่องทำงานช้ามาก', 'ต้องการติดตั้ง OS ใหม่'],
                'urgency' => 'normal',
                'customer_name' => 'ธนภัทร สุขสมบูรณ์',
                'customer_phone' => '0861112233',
                'customer_email' => 'tanapat@example.com',
                'customer_address' => '54 ถ.มาลัยแมน ต.ลำพยา อ.เมือง จ.นครปฐม 73000',
                'status' => 'inspecting',
                'estimated_cost' => 800.00,
                'technician_notes' => 'ช่างกำลังกักกันมัลแวร์และตรวจสอบ integrity ของไฟล์ในพาร์ติชันข้อมูล และเตรียมติดตั้งระบบปฏิบัติการใหม่',
                'completed_at' => null,
                'created_at' => now(),
            ],
        ];

        foreach ($tickets as $ticket) {
            RepairTicket::updateOrCreate(
                ['ticket_number' => $ticket['ticket_number']],
                $ticket
            );
        }
    }
}
