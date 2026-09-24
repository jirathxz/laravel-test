<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
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
     * Display the shopping cart.
     */
    public function index(Request $request): Response
    {
        $items = $this->cartQuery($request)->get();

        $subtotal = $items->sum(function (CartItem $item) {
            return $item->quantity * ($item->product ? $item->product->price : 0);
        });

        $totalItems = $items->sum('quantity');

        return Inertia::render('shop/cart', [
            'items' => $items,
            'subtotal' => (float) $subtotal,
            'totalItems' => (int) $totalItems,
        ]);
    }

    /**
     * Add an item to the shopping cart.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $quantityToAdd = (int) ($validated['quantity'] ?? 1);

        if ($product->stock < 1) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'สินค้าชิ้นนี้หมดสต็อกแล้ว']);

            return back();
        }

        $userId = $request->user()?->id;
        $sessionId = $userId ? null : $request->session()->getId();

        $cartItem = CartItem::query()
            ->where('product_id', $product->id)
            ->where(function (Builder $query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if ($cartItem) {
            $newQuantity = min($cartItem->quantity + $quantityToAdd, $product->stock);
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            CartItem::create([
                'user_id' => $userId,
                'session_id' => $sessionId,
                'product_id' => $product->id,
                'quantity' => min($quantityToAdd, $product->stock),
            ]);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => "เพิ่ม {$product->name} ลงในตะกร้าแล้ว"]);

        return back();
    }

    /**
     * Update the quantity of a cart item.
     */
    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:0'],
        ]);

        $newQuantity = (int) $validated['quantity'];

        if ($newQuantity <= 0) {
            $cartItem->delete();
            Inertia::flash('toast', ['type' => 'info', 'message' => 'นำสินค้าออกจากตะกร้าแล้ว']);

            return back();
        }

        $product = $cartItem->product;
        if ($product && $newQuantity > $product->stock) {
            $newQuantity = $product->stock;
            Inertia::flash('toast', ['type' => 'warning', 'message' => 'จำนวนสินค้าถูกจำกัดตามสต็อกที่มีอยู่']);
        }

        $cartItem->update(['quantity' => $newQuantity]);

        return back();
    }

    /**
     * Remove an item from the shopping cart.
     */
    public function destroy(Request $request, CartItem $cartItem): RedirectResponse
    {
        $cartItem->delete();
        Inertia::flash('toast', ['type' => 'info', 'message' => 'ลบรายการออกจากตะกร้าเรียบร้อย']);

        return back();
    }

    /**
     * Clear all items in the shopping cart.
     */
    public function clear(Request $request): RedirectResponse
    {
        $this->cartQuery($request)->delete();
        Inertia::flash('toast', ['type' => 'info', 'message' => 'ล้างตะกร้าสินค้าเรียบร้อย']);

        return back();
    }
}
