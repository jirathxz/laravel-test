<?php

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

test('shop storefront catalog can be rendered', function () {
    $response = $this->get(route('home'));

    $response->assertOk();
});

test('can filter products by type hardware or software', function () {
    $hardwareCategory = Category::create([
        'name' => 'CPUs',
        'slug' => 'test-cpus',
        'type' => 'hardware',
    ]);

    $product = Product::create([
        'category_id' => $hardwareCategory->id,
        'name' => 'Test CPU',
        'slug' => 'test-cpu',
        'brand' => 'AMD',
        'type' => 'hardware',
        'price' => 10000,
        'stock' => 10,
        'description' => 'Test',
        'specs' => [],
        'is_featured' => true,
    ]);

    $response = $this->get(route('shop.index', ['type' => 'hardware']));
    $response->assertOk();
});

test('can view product details page', function () {
    $category = Category::create([
        'name' => 'Software Test',
        'slug' => 'software-test',
        'type' => 'software',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Windows Test Pro',
        'slug' => 'windows-test-pro',
        'brand' => 'Microsoft',
        'type' => 'software',
        'price' => 5000,
        'stock' => 15,
        'description' => 'Test software description',
        'specs' => ['License' => 'Lifetime'],
    ]);

    $response = $this->get(route('products.show', $product->slug));
    $response->assertOk();
});

test('can add product to cart and update quantity', function () {
    $category = Category::create([
        'name' => 'Storage Test',
        'slug' => 'storage-test',
        'type' => 'hardware',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Test SSD 1TB',
        'slug' => 'test-ssd-1tb',
        'brand' => 'Samsung',
        'type' => 'hardware',
        'price' => 3500,
        'stock' => 20,
    ]);

    // Add to cart
    $addResponse = $this->post(route('cart.store'), [
        'product_id' => $product->id,
        'quantity' => 2,
    ]);

    $addResponse->assertRedirect();
    $this->assertDatabaseHas('cart_items', [
        'product_id' => $product->id,
        'quantity' => 2,
    ]);

    // View cart
    $cartResponse = $this->get(route('cart.index'));
    $cartResponse->assertOk();
});

test('can checkout and place order with promptpay', function () {
    $user = User::factory()->create();

    $category = Category::create([
        'name' => 'RAM Test',
        'slug' => 'ram-test',
        'type' => 'hardware',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'DDR5 32GB Test',
        'slug' => 'ddr5-32gb-test',
        'brand' => 'Corsair',
        'type' => 'hardware',
        'price' => 4500,
        'stock' => 10,
    ]);

    // Acting as user, add item to cart
    $this->actingAs($user)->post(route('cart.store'), [
        'product_id' => $product->id,
        'quantity' => 1,
    ]);

    // Submit checkout
    $checkoutResponse = $this->actingAs($user)->post(route('checkout.store'), [
        'customer_name' => 'สมเกียรติ มั่นคง',
        'customer_email' => 'somkius@example.com',
        'customer_phone' => '0812345678',
        'shipping_address' => '85 ถ.มาลัยแมน ต.หนองปากโลง อ.เมือง จ.นครปฐม 73000',
        'payment_method' => 'promptpay',
        'notes' => 'โทรแจ้งก่อนเข้าส่ง',
    ]);

    $order = Order::latest()->first();
    expect($order)->not->toBeNull();
    expect($order->customer_name)->toBe('สมเกียรติ มั่นคง');
    expect($order->payment_method)->toBe('promptpay');
    expect($order->payment_status)->toBe('pending');
    expect($product->fresh()->stock)->toBe(9); // stock deducted

    $checkoutResponse->assertRedirect(route('orders.show', $order->order_number));

    // Confirm mock payment
    $paymentResponse = $this->actingAs($user)->post(route('orders.confirm-payment', $order->id));
    $paymentResponse->assertRedirect();
    expect($order->fresh()->payment_status)->toBe('paid');
});

test('can checkout with cash on delivery (COD)', function () {
    $user = User::factory()->create();

    $category = Category::create([
        'name' => 'GPU Test',
        'slug' => 'gpu-test',
        'type' => 'hardware',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'RTX 4060 Test',
        'slug' => 'rtx-4060-test',
        'brand' => 'ASUS',
        'type' => 'hardware',
        'price' => 12000,
        'stock' => 5,
    ]);

    $this->actingAs($user)->post(route('cart.store'), [
        'product_id' => $product->id,
        'quantity' => 1,
    ]);

    $response = $this->actingAs($user)->post(route('checkout.store'), [
        'customer_name' => 'กิตติศักดิ์ พัฒนา',
        'customer_email' => 'customer@example.com',
        'customer_phone' => '0899998888',
        'shipping_address' => '123 หมู่ 4 ต.บ่อพลับ อ.เมือง จ.นครปฐม 73000',
        'payment_method' => 'cod',
    ]);

    $order = Order::latest()->first();
    expect($order)->not->toBeNull();
    expect($order->payment_method)->toBe('cod');
    expect($order->payment_status)->toBe('pending');

    $response->assertRedirect(route('orders.show', $order->order_number));
});
