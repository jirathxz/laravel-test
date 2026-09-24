import { useForm, Head, Link } from '@inertiajs/react';
import {
    ShieldCheck,
    Truck,
    QrCode,
    Banknote,
    ArrowLeft,
    CheckCircle2,
    Lock,
    ShoppingBag,
} from 'lucide-react';
import type { CartItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import InputError from '@/components/input-error';

interface Props {
    items: CartItem[];
    subtotal: number;
    shippingFee: number;
    total: number;
    defaultValues: {
        customer_name: string;
        customer_email: string;
        customer_phone: string;
        shipping_address: string;
        payment_method: 'promptpay' | 'cod';
        notes: string;
    };
}



export default function CheckoutPage({
    items,
    subtotal,
    shippingFee,
    total,
    defaultValues,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: defaultValues.customer_name || '',
        customer_email: defaultValues.customer_email || '',
        customer_phone: defaultValues.customer_phone || '',
        shipping_address: defaultValues.shipping_address || '',
        payment_method: defaultValues.payment_method || 'promptpay',
        notes: defaultValues.notes || '',
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };

    return (
        <>
            <Head title="ชำระเงินและสั่งซื้อสินค้า | TechStore" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl w-full mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-3">
                            <Lock className="size-7 text-primary" />
                            ยืนยันคำสั่งซื้อและชำระเงิน
                        </h1>
                        <p className="text-muted-foreground text-xs mt-1">
                            กรุณากรอกข้อมูลการจัดส่งและเลือกวิธีการชำระเงิน
                        </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-1.5">
                        <Link href="/cart">
                            <ArrowLeft className="size-3.5" /> กลับไปตะกร้า
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Form Inputs (Left Column) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* 1. Customer Information */}
                            <Card className="border-border bg-card">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                        <span className="size-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                            1
                                        </span>
                                        ข้อมูลผู้สั่งซื้อและติดต่อ
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="customer_name" className="text-xs">
                                                ชื่อ-นามสกุล ผู้รับสินค้า <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="customer_name"
                                                type="text"
                                                value={data.customer_name}
                                                onChange={(e) => setData('customer_name', e.target.value)}
                                                placeholder="เช่น สมชาย ใจดี"
                                                required
                                            />
                                            <InputError message={errors.customer_name} />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="customer_phone" className="text-xs">
                                                เบอร์โทรศัพท์ <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="customer_phone"
                                                type="tel"
                                                value={data.customer_phone}
                                                onChange={(e) => setData('customer_phone', e.target.value)}
                                                placeholder="เช่น 0812345678"
                                                required
                                            />
                                            <InputError message={errors.customer_phone} />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="customer_email" className="text-xs">
                                            อีเมล (สำหรับรับใบเสร็จและรหัสโปรแกรม) <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="customer_email"
                                            type="email"
                                            value={data.customer_email}
                                            onChange={(e) => setData('customer_email', e.target.value)}
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <InputError message={errors.customer_email} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 2. Shipping Address */}
                            <Card className="border-border bg-card">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                        <span className="size-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                            2
                                        </span>
                                        ที่อยู่จัดส่งสินค้า
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="shipping_address" className="text-xs">
                                            ที่อยู่สำหรับจัดส่งพัสดุ <span className="text-destructive">*</span>
                                        </Label>
                                        <textarea
                                            id="shipping_address"
                                            rows={3}
                                            value={data.shipping_address}
                                            onChange={(e) => setData('shipping_address', e.target.value)}
                                            placeholder="บ้านเลขที่, หมู่บ้าน/อาคาร, ถนน, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, รหัสไปรษณีย์"
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            required
                                        />
                                        <InputError message={errors.shipping_address} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="notes" className="text-xs text-muted-foreground">
                                            หมายเหตุถึงผู้จัดส่ง (ถ้ามี)
                                        </Label>
                                        <Input
                                            id="notes"
                                            type="text"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="เช่น ฝากไว้ที่ป้อมยาม, โทรแจ้งก่อนส่ง"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 3. Payment Method */}
                            <Card className="border-border bg-card">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                        <span className="size-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                            3
                                        </span>
                                        เลือกช่องทางการชำระเงิน
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {/* Option 1: PromptPay */}
                                    <div
                                        onClick={() => setData('payment_method', 'promptpay')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                                            data.payment_method === 'promptpay'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border bg-card hover:border-muted-foreground/30'
                                        }`}
                                    >
                                        <div
                                            className={`size-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                                data.payment_method === 'promptpay'
                                                    ? 'border-primary'
                                                    : 'border-muted-foreground'
                                            }`}
                                        >
                                            {data.payment_method === 'promptpay' && (
                                                <div className="size-2.5 rounded-full bg-primary" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <QrCode className="size-5 text-primary" />
                                                <span className="font-bold text-foreground text-sm">
                                                    สแกนจ่ายผ่าน QR Code พร้อมเพย์ (PromptPay)
                                                </span>
                                                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                                                    แนะนำ / ฟรีค่าธรรมเนียม
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                ระบบจะสร้าง QR Code พร้อมเพย์ให้คุณสแกนจ่ายผ่านแอปพลิเคชันทุกธนาคาร ยืนยันยอดอัตโนมัติรวดเร็ว
                                            </p>
                                        </div>
                                    </div>

                                    {/* Option 2: Cash on Delivery */}
                                    <div
                                        onClick={() => setData('payment_method', 'cod')}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                                            data.payment_method === 'cod'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border bg-card hover:border-muted-foreground/30'
                                        }`}
                                    >
                                        <div
                                            className={`size-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                                data.payment_method === 'cod'
                                                    ? 'border-primary'
                                                    : 'border-muted-foreground'
                                            }`}
                                        >
                                            {data.payment_method === 'cod' && (
                                                <div className="size-2.5 rounded-full bg-primary" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Banknote className="size-5 text-emerald-500" />
                                                <span className="font-bold text-foreground text-sm">
                                                    เก็บเงินปลายทาง (Cash on Delivery)
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                                ชำระเงินสดกับเจ้าหน้าที่จัดส่งพัสดุเมื่อได้รับสินค้าถึงหน้าบ้าน
                                            </p>
                                        </div>
                                    </div>

                                    <InputError message={errors.payment_method} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary & Submit (Right Column) */}
                        <div className="lg:col-span-5 space-y-4">
                            <Card className="border-border bg-card">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                        <ShoppingBag className="size-4 text-primary" />
                                        รายการสินค้าที่จะสั่งซื้อ ({items.length} รายการ)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Item Preview list */}
                                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                        {items.map((item) => {
                                            const product = item.product;
                                            if (!product) return null;
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center gap-3 text-xs pb-2 border-b border-border/60 last:border-b-0"
                                                >
                                                    <img
                                                        src={product.image_url || ''}
                                                        alt={product.name}
                                                        className="size-12 rounded-lg object-cover bg-muted/40 border border-border flex-shrink-0"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-foreground truncate">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-muted-foreground mt-0.5">
                                                            จำนวน: {item.quantity} ชิ้น
                                                        </div>
                                                    </div>
                                                    <div className="font-bold text-foreground text-right">
                                                        {formatPrice(product.price * item.quantity)}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <Separator />

                                    {/* Pricing breakdown */}
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>ยอดรวมสินค้า</span>
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
                                        <div className="flex justify-between items-baseline pt-2 border-t border-border">
                                            <span className="text-sm font-bold text-foreground">ยอดชำระสุทธิ</span>
                                            <span className="text-2xl font-black text-primary">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processing || items.length === 0}
                                        className="w-full h-12 font-bold text-sm bg-primary text-primary-foreground shadow-md hover:bg-primary/90 mt-2 gap-2"
                                    >
                                        <CheckCircle2 className="size-5" />
                                        {processing
                                            ? 'กำลังประมวลผลคำสั่งซื้อ...'
                                            : `ยืนยันคำสั่งซื้อ (${formatPrice(total)})`}
                                    </Button>

                                    {/* Security Guarantee */}
                                    <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1.5 text-center">
                                        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground">
                                            <ShieldCheck className="size-4 text-emerald-500" />
                                            การสั่งซื้อปลอดภัย มั่นใจได้ 100%
                                        </div>
                                        <p className="text-[11px] text-muted-foreground">
                                            ระบบเก็บรักษาข้อมูลของคุณตามมาตรฐานความปลอดภัยระดับสากล
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

CheckoutPage.layout = {
    breadcrumbs: [
        {
            title: 'ร้านค้า (Shop)',
            href: '/shop',
        },
        {
            title: 'ตะกร้าสินค้า (Cart)',
            href: '/cart',
        },
        {
            title: 'ชำระเงิน (Checkout)',
            href: '/checkout',
        },
    ],
};

