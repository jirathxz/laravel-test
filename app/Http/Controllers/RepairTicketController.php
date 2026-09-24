<?php

namespace App\Http\Controllers;

use App\Models\RepairTicket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketController extends Controller
{
    /**
     * Display a listing of repair tickets or tracking portal.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $query = RepairTicket::query()->latest();

        if ($user) {
            $query->where('user_id', $user->id);
        }

        $tickets = $user ? $query->paginate(10)->withQueryString() : null;

        return Inertia::render('repairs/index', [
            'tickets' => $tickets,
            'isAuthenticated' => (bool) $user,
        ]);
    }

    /**
     * Show the form for creating a new repair request.
     */
    public function create(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('repairs/create', [
            'defaultValues' => [
                'customer_name' => $user?->name ?? '',
                'customer_email' => $user?->email ?? '',
                'customer_phone' => '',
                'customer_address' => '',
                'service_type' => 'drop_off',
                'urgency' => 'normal',
            ],
        ]);
    }

    /**
     * Store a newly created repair ticket in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'device_type' => 'required|string|max:50',
            'device_brand' => 'required|string|max:100',
            'device_model' => 'required|string|max:100',
            'serial_number' => 'nullable|string|max:100',
            'service_type' => 'required|in:drop_off,pickup',
            'problem_description' => 'required|string|max:2000',
            'symptoms' => 'nullable|array',
            'urgency' => 'required|in:normal,urgent',
            'customer_name' => 'required|string|max:100',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'required|email|max:100',
            'customer_address' => 'nullable|string|max:500',
        ]);

        $validated['ticket_number'] = RepairTicket::generateTicketNumber();
        $validated['user_id'] = $request->user()?->id;
        $validated['status'] = 'pending';

        $ticket = RepairTicket::create($validated);

        return redirect()->route('repairs.show', $ticket->ticket_number)
            ->with('success', "ส่งคำขอแจ้งซ่อมสำเร็จ รหัสใบแจ้งซ่อมของคุณคือ {$ticket->ticket_number}");
    }

    /**
     * Display the specified repair ticket by ticket number.
     */
    public function show(string $ticketNumber): Response
    {
        $ticket = RepairTicket::where('ticket_number', $ticketNumber)->firstOrFail();

        return Inertia::render('repairs/show', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Search/track repair ticket by ticket number.
     */
    public function track(Request $request): RedirectResponse
    {
        $request->validate([
            'ticket_number' => 'required|string',
        ]);

        $ticket = RepairTicket::where('ticket_number', trim($request->ticket_number))->first();

        if (! $ticket) {
            return back()->withErrors(['ticket_number' => 'ไม่พบข้อมูลใบแจ้งซ่อมตามรหัสที่ระบุ กรุณาตรวจสอบรหัสอีกครั้ง']);
        }

        return redirect()->route('repairs.show', $ticket->ticket_number);
    }

    /**
     * Advance ticket status for demonstration/testing purposes.
     */
    public function advanceStatus(RepairTicket $ticket): RedirectResponse
    {
        $flow = [
            'pending' => [
                'next' => 'inspecting',
                'note' => 'ช่างรับเครื่องและเริ่มตรวจสอบการทำงานของอุปกรณ์ ตรวจเช็คระบบไฟฟ้า และทดสอบฮาร์ดแวร์เบื้องต้น',
                'cost' => 500.00,
            ],
            'inspecting' => [
                'next' => 'in_progress',
                'note' => 'ตรวจพบสาเหตุเรียบร้อยแล้ว กำลังดำเนินการเปลี่ยนอุปกรณ์และแก้ไขระบบระบายความร้อน',
                'cost' => 1200.00,
            ],
            'in_progress' => [
                'next' => 'waiting_parts',
                'note' => 'กำลังรออะไหล่แท้จากศูนย์บริการใหญ่ สินค้าอยู่ระหว่างการขนส่ง',
                'cost' => 1500.00,
            ],
            'waiting_parts' => [
                'next' => 'completed',
                'note' => 'อะไหล่มาถึงแล้วและติดตั้งเรียบร้อย ผ่านการทดสอบ Stress Test 12 ชั่วโมง อุปกรณ์ทำงานปกติ พร้อมส่งมอบให้ลูกค้า',
                'cost' => 1500.00,
            ],
            'completed' => [
                'next' => 'pending',
                'note' => 'รีเซ็ตสถานะกลับมาเป็นรอดำเนินการสำหรับทดสอบใหม่',
                'cost' => null,
            ],
        ];

        $current = $ticket->status;
        $step = $flow[$current] ?? $flow['completed'];

        $ticket->status = $step['next'];
        $ticket->technician_notes = $step['note'];
        if ($step['cost'] !== null) {
            $ticket->estimated_cost = $step['cost'];
        }
        if ($step['next'] === 'completed') {
            $ticket->completed_at = now();
        }

        $ticket->save();

        return back()->with('success', "อัปเดตสถานะงานซ่อมเป็น '{$ticket->status}' เรียบร้อยแล้ว");
    }
}
