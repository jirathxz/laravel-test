<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    /**
     * Get the query builder scoped to the current user/session.
     *
     * @return Builder<CartItem>
     */
    private function cartQuery(Request $request): Builder
    {
        return CartItem::query()
            ->with(['product.category'])
            ->where(function (Builder $query) use ($request) {
                if ($request->user()) {
                    $query->where('user_id', $request->user()->id);
                } else {
                    $query->where('session_id', $request->session()->getId());
                }
            });
    }

    /**
     * Show the checkout page.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        $items = $this->cartQuery($request)->get();

        if ($items->isEmpty()) {
            Inertia::flash('toast', ['type' => 'warning', 'message' => 'ตะกร้าสินค้าของคุณว่างเปล่า กรุณาเลือกสินค้าก่อน']);

            return redirect()->route('cart.index');
        }

        $subtotal = $items->sum(function (CartItem $item) {
            return $item->quantity * ($item->product ? $item->product->price : 0);
        });

        $shippingFee = $subtotal >= 3000 ? 0.00 : 100.00;
        $total = $subtotal + $shippingFee;

        $user = $request->user();

        return Inertia::render('shop/checkout', [
            'items' => $items,
            'subtotal' => (float) $subtotal,
            'shippingFee' => (float) $shippingFee,
            'total' => (float) $total,
            'defaultValues' => [
                'customer_name' => $user?->name ?? '',
                'customer_email' => $user?->email ?? '',
                'customer_phone' => '',
                'shipping_address' => '',
                'payment_method' => 'promptpay',
                'notes' => '',
            ],
        ]);
    }

    /**
     * Process checkout and place order.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:25'],
            'shipping_address' => ['required', 'string', 'max:500'],
            'payment_method' => ['required', 'in:promptpay,cod'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $items = $this->cartQuery($request)->get();

        if ($items->isEmpty()) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'ไม่มีสินค้าในตะกร้า']);

            return redirect()->route('shop.index');
        }

        $subtotal = $items->sum(function (CartItem $item) {
            return $item->quantity * ($item->product ? $item->product->price : 0);
        });
        $shippingFee = $subtotal >= 3000 ? 0.00 : 100.00;
        $totalAmount = $subtotal + $shippingFee;

        $order = DB::transaction(function () use ($request, $validated, $items, $totalAmount) {
            $orderNumber = 'ORD-'.date('Ymd').'-'.strtoupper(Str::random(5));

            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => $request->user()?->id,
                'customer_name' => $validated['customer_name'],
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'],
                'shipping_address' => $validated['shipping_address'],
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'pending',
                'order_status' => 'processing',
                'total_amount' => $totalAmount,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($items as $item) {
                if ($item->product) {
                    $itemPrice = (float) $item->product->price;
                    $itemQty = (int) $item->quantity;

                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name,
                        'price' => $itemPrice,
                        'quantity' => $itemQty,
                        'subtotal' => $itemPrice * $itemQty,
                    ]);

                    // Decrement stock safely
                    $item->product->decrement('stock', min($itemQty, $item->product->stock));
                }
            }

            // Clear cart
            $this->cartQuery($request)->delete();

            return $order;
        });

        Inertia::flash('toast', ['type' => 'success', 'message' => "สร้างคำสั่งซื้อ #{$order->order_number} สำเร็จแล้ว"]);

        return redirect()->route('orders.show', $order->order_number);
    }
}
