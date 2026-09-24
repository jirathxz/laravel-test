import { Head, Link, router } from '@inertiajs/react';
import {
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ArrowLeft,
    Truck,
    ShieldCheck,
    CreditCard,
} from 'lucide-react';
import type { CartItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
    items: CartItem[];
    subtotal: number;
    totalItems: number;
}



export default function CartIndex({ items, subtotal, totalItems }: Props) {
    const freeShippingThreshold = 3000;
    const shippingFee = subtotal >= freeShippingThreshold ? 0 : 100;
    const grandTotal = subtotal + shippingFee;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleUpdateQuantity = (item: CartItem, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(item.id);
            return;
        }

        router.patch(
            `/cart/${item.id}`,
            { quantity: newQuantity },
            { preserveScroll: true },
        );
    };

    const handleRemoveItem = (itemId: number) => {
        router.delete(`/cart/item/${itemId}`, { preserveScroll: true });
    };

    const handleClearCart = () => {
        if (confirm('คุณต้องการล้างสินค้าทั้งหมดในตะกร้าหรือไม่?')) {
            router.delete('/cart', { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="ตะกร้าสินค้าของคุณ | TechStore" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl w-full mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-3">
                            <ShoppingCart className="size-7 text-primary" />
                            ตะกร้าสินค้า
                            <span className="text-base font-normal text-muted-foreground">
                                ({totalItems} ชิ้น)
                            </span>
                        </h1>
                    </div>

                    {items.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearCart}
                            className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                            <Trash2 className="size-3.5 mr-1" /> ล้างตะกร้า
                        </Button>
                    )}
                </div>

                {items.length === 0 ? (
                    <Card className="text-center py-16 px-6 border-border bg-card max-w-md mx-auto w-full">
                        <CardContent className="space-y-4">
                            <div className="size-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                                <ShoppingCart className="size-8" />
                            </div>
                            <h2 className="text-lg font-bold text-foreground">ไม่มีสินค้าในตะกร้า</h2>
                            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mx-auto">
                                คุณยังไม่ได้เลือกสินค้าลงในตะกร้า เริ่มต้นเลือกชมอุปกรณ์คอมพิวเตอร์และซอฟต์แวร์ได้เลย
                            </p>
                            <Button asChild className="gap-2 font-bold">
                                <Link href="/shop">
                                    <ArrowLeft className="size-4" /> เริ่มต้นเลือกซื้อสินค้า
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Items Column */}
                        <div className="lg:col-span-8 space-y-4">
                            {/* Free Shipping Progress bar */}
                            <Card className="p-4 border-border bg-card text-xs">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="flex items-center gap-1.5 font-semibold text-foreground">
                                        <Truck className="size-4 text-primary" />
                                        {remainingForFreeShipping === 0 ? (
                                            <span className="text-emerald-500 font-bold">
                                                ยินดีด้วย! คุณได้รับสิทธิ์จัดส่งฟรีทั่วประเทศ
                                            </span>
                                        ) : (
                                            <span>
                                                ซื้อเพิ่มอีก{' '}
                                                <strong className="text-primary font-bold">
                                                    {formatPrice(remainingForFreeShipping)}
                                                </strong>{' '}
                                                เพื่อรับสิทธิ์จัดส่งฟรี!
                                            </span>
                                        )}
                                    </span>
                                    <span className="font-bold text-muted-foreground">{progressPercent}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500 rounded-full"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </Card>

                            {/* Item Rows */}
                            <div className="space-y-3">
                                {items.map((item) => {
                                    const product = item.product;
                                    if (!product) return null;
                                    const isHardware = product.type === 'hardware';

                                    return (
                                        <Card
                                            key={item.id}
                                            className="p-4 border-border bg-card hover:border-border/80 transition-colors"
                                        >
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                {/* Image */}
                                                <Link
                                                    href={`/products/${product.slug}`}
                                                    className="size-20 rounded-lg overflow-hidden bg-muted/40 border border-border flex-shrink-0"
                                                >
                                                    <img
                                                        src={product.image_url || ''}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </Link>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Badge variant={isHardware ? 'default' : 'secondary'} className="text-[10px] px-1.5 py-0">
                                                            {isHardware ? 'Hardware' : 'Software'}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground font-medium">
                                                            {product.brand}
                                                        </span>
                                                    </div>
                                                    <Link
                                                        href={`/products/${product.slug}`}
                                                        className="text-sm font-bold text-foreground hover:text-primary transition-colors line-clamp-1 block mb-1"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <div className="text-xs font-semibold text-muted-foreground">
                                                        {formatPrice(product.price)} / ชิ้น
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                    <div className="flex items-center bg-muted/60 border border-border rounded-lg p-0.5">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-7"
                                                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                                                        >
                                                            <Minus className="size-3" />
                                                        </Button>
                                                        <span className="w-8 text-center text-xs font-bold text-foreground">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-7"
                                                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                                                            disabled={item.quantity >= product.stock}
                                                        >
                                                            <Plus className="size-3" />
                                                        </Button>
                                                    </div>

                                                    {/* Subtotal */}
                                                    <div className="text-right sm:min-w-[100px]">
                                                        <div className="text-sm font-black text-primary">
                                                            {formatPrice(product.price * item.quantity)}
                                                        </div>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        title="ลบสินค้านี้"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>

                            <div className="pt-2">
                                <Button asChild variant="outline" size="sm" className="gap-2">
                                    <Link href="/shop">
                                        <ArrowLeft className="size-3.5" /> เลือกซื้อสินค้าต่อ
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary Column */}
                        <div className="lg:col-span-4 space-y-4">
                            <Card className="border-border bg-card">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold text-foreground">
                                        สรุปคำสั่งซื้อ
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>ยอดรวมสินค้า ({totalItems} ชิ้น)</span>
                                        <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>ค่าจัดส่ง</span>
                                        <span className="font-semibold">
                                            {shippingFee === 0 ? (
                                                <span className="text-emerald-500 font-bold">จัดส่งฟรี</span>
                                            ) : (
                                                formatPrice(shippingFee)
                                            )}
                                        </span>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between items-baseline pt-1">
                                        <span className="font-bold text-foreground">ยอดสุทธิที่ต้องชำระ</span>
                                        <span className="text-2xl font-black text-primary">
                                            {formatPrice(grandTotal)}
                                        </span>
                                    </div>
                                    <div className="text-[11px] text-muted-foreground text-right">
                                        (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0 flex flex-col gap-2">
                                    <Button
                                        asChild
                                        className="w-full h-11 font-bold text-sm bg-primary text-primary-foreground shadow-md hover:bg-primary/90 gap-2"
                                    >
                                        <Link href="/checkout">
                                            ดำเนินการชำระเงิน <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>

                                    <div className="w-full text-center pt-2">
                                        <div className="flex items-center justify-center gap-4 text-muted-foreground text-[11px]">
                                            <span className="flex items-center gap-1">
                                                <ShieldCheck className="size-3 text-emerald-500" /> ปลอดภัย 100%
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <CreditCard className="size-3 text-primary" /> พร้อมเพย์ / COD
                                            </span>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

CartIndex.layout = {
    breadcrumbs: [
        {
            title: 'ร้านค้า (Shop)',
            href: '/shop',
        },
        {
            title: 'ตะกร้าสินค้า (Cart)',
            href: '/cart',
        },
    ],
};

