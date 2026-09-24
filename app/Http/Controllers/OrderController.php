<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        $orders = Order::with(['items.product'])
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display the specified order details and payment slip/status.
     */
    public function show(string $orderNumber): Response
    {
        $order = Order::with(['items.product.category'])
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Confirm mock payment for PromptPay QR.
     */
    public function confirmPayment(Order $order): RedirectResponse
    {
        $order->update([
            'payment_status' => 'paid',
            'order_status' => 'processing',
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'จำลองการชำระเงินผ่าน PromptPay สำเร็จเรียบร้อย!',
        ]);

        return back();
    }
}
