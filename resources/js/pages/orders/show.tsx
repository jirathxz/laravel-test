import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Truck,
    Package,
    QrCode,
    Banknote,
    Copy,
    ArrowLeft,
    CreditCard,
    Printer,
} from 'lucide-react';
import type { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const [copied, setCopied] = useState(false);
    const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);



    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleCopyOrderNumber = () => {
        navigator.clipboard.writeText(order.order_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleConfirmPayment = () => {
        setIsSimulatingPayment(true);
        router.post(
            `/orders/${order.id}/confirm-payment`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsSimulatingPayment(false),
            },
        );
    };

    // PromptPay QR image URL using public QR generator
    const qrData = `PromptPay|TECHSTORE|${order.order_number}|${order.total_amount}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

    return (
        <>
            <Head title={`คำสั่งซื้อ #${order.order_number} | TechStore`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl w-full mx-auto">
                {/* Header Success / Status Card */}
                <Card className="border-border bg-gradient-to-br from-card via-card to-muted/40 text-center relative overflow-hidden py-6">
                    <CardContent className="space-y-4 pt-4">
                        <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="size-10" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
                                สร้างคำสั่งซื้อสำเร็จเรียบร้อย!
                            </h1>
                            <p className="text-muted-foreground text-xs mt-1">
                                ขอบคุณสำหรับการสั่งซื้อ ระบบได้บันทึกคำสั่งซื้อของคุณแล้ว
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 bg-muted/60 border border-border px-4 py-2 rounded-xl text-xs">
                            <span className="text-muted-foreground">เลขที่คำสั่งซื้อ:</span>
                            <span className="font-mono font-bold text-primary text-sm">{order.order_number}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-6 text-muted-foreground hover:text-foreground ml-1"
                                onClick={handleCopyOrderNumber}
                                title="คัดลอกเลขที่คำสั่งซื้อ"
                            >
                                {copied ? <CheckCircle2 className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Card (PromptPay QR or COD) */}
                {order.payment_method === 'promptpay' ? (
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3 text-center">
                            <CardTitle className="text-base font-bold text-foreground flex items-center justify-center gap-2">
                                <QrCode className="size-5 text-primary" />
                                การชำระเงินผ่าน PromptPay QR Code
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {order.payment_status === 'paid' ? (
                                <div className="text-center py-6 space-y-2">
                                    <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-6" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">ชำระเงินเรียบร้อยแล้ว</h2>
                                    <p className="text-xs text-muted-foreground">
                                        ระบบได้รับการชำระเงินแล้ว เจ้าหน้าที่จะเตรียมจัดส่งสินค้าให้ท่านทันที
                                    </p>
                                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/10 mt-2">
                                        สถานะ: ชำระเงินแล้ว (Paid)
                                    </Badge>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center space-y-4 py-2">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-border inline-block">
                                        <img
                                            src={qrCodeUrl}
                                            alt="PromptPay QR Code"
                                            className="size-48 sm:size-56 object-contain"
                                        />
                                        <div className="text-[11px] font-bold text-neutral-800 mt-2">
                                            TECHSTORE PROMPTPAY
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-xs text-muted-foreground">ยอดเงินที่ต้องสแกนจ่าย:</div>
                                        <div className="text-3xl font-black text-primary">
                                            {formatPrice(order.total_amount)}
                                        </div>
                                        <div className="text-xs text-amber-500 font-semibold flex items-center justify-center gap-1 mt-1">
                                            <Clock className="size-3.5" /> กรุณาชำระเงินภายใน 24 ชั่วโมง
                                        </div>
                                    </div>

                                    {/* Simulation Button for Mock Payment */}
                                    <div className="w-full max-w-sm pt-2">
                                        <Button
                                            onClick={handleConfirmPayment}
                                            disabled={isSimulatingPayment}
                                            className="w-full h-11 font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white gap-2 shadow-sm"
                                        >
                                            <CheckCircle2 className="size-4" />
                                            {isSimulatingPayment
                                                ? 'กำลังตรวจสอบยอดชำระ...'
                                                : 'จำลองการชำระเงินสำเร็จ (Simulate Mock Payment)'}
                                        </Button>
                                        <p className="text-[11px] text-muted-foreground mt-1.5">
                                            * กดปุ่มด้านบนเพื่อจำลองระบบชำระเงินจริงในโหมดทดสอบ
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3 text-center">
                            <CardTitle className="text-base font-bold text-foreground flex items-center justify-center gap-2">
                                <Banknote className="size-5 text-emerald-500" />
                                วิธีชำระเงิน: เก็บเงินปลายทาง (Cash on Delivery)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-2 py-4">
                            <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                                <Truck className="size-6" />
                            </div>
                            <h2 className="text-lg font-bold text-foreground">
                                ยอดที่ต้องเตรียมชำระ: {formatPrice(order.total_amount)}
                            </h2>
                            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                                เจ้าหน้าที่ขนส่งจะติดต่อเบอร์ <strong className="text-foreground">{order.customer_phone}</strong> ก่อนนำจ่ายพัสดุ กรุณาเตรียมเงินสดให้พอดีกับยอดสั่งซื้อ
                            </p>
                            <Badge variant="outline" className="border-amber-500/30 text-amber-500 bg-amber-500/10 mt-2">
                                สถานะ: รอชำระเงินเมื่อได้รับสินค้า
                            </Badge>
                        </CardContent>
                    </Card>
                )}

                {/* Order Details & Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer & Shipping Info */}
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                <Truck className="size-4 text-primary" /> ข้อมูลการจัดส่ง
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ชื่อผู้รับ:</span>
                                <span className="font-semibold text-foreground">{order.customer_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">เบอร์โทรศัพท์:</span>
                                <span className="font-semibold text-foreground">{order.customer_phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">อีเมล:</span>
                                <span className="font-semibold text-foreground">{order.customer_email}</span>
                            </div>
                            <Separator />
                            <div>
                                <span className="text-muted-foreground block mb-1">ที่อยู่จัดส่ง:</span>
                                <p className="text-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border">
                                    {order.shipping_address}
                                </p>
                            </div>
                            {order.notes && (
                                <div>
                                    <span className="text-muted-foreground block mb-1">หมายเหตุ:</span>
                                    <p className="text-foreground leading-relaxed italic bg-muted/30 p-2.5 rounded-lg border border-border">
                                        {order.notes}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Order Status & Financial Summary */}
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                <CreditCard className="size-4 text-primary" /> สรุปข้อมูลคำสั่งซื้อ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">สถานะคำสั่งซื้อ:</span>
                                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                                    {order.status === 'pending'
                                        ? 'รอดำเนินการ'
                                        : order.status === 'processing'
                                          ? 'กำลังเตรียมจัดส่ง'
                                          : 'จัดส่งแล้ว'}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">สถานะชำระเงิน:</span>
                                <Badge
                                    variant="outline"
                                    className={
                                        order.payment_status === 'paid'
                                            ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                                            : 'border-amber-500/30 text-amber-500 bg-amber-500/10'
                                    }
                                >
                                    {order.payment_status === 'paid' ? 'ชำระแล้ว' : 'รอชำระเงิน'}
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ช่องทางชำระเงิน:</span>
                                <span className="font-semibold text-foreground">
                                    {order.payment_method === 'promptpay' ? 'PromptPay QR' : 'เก็บเงินปลายทาง (COD)'}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ยอดรวมสินค้า:</span>
                                <span className="font-semibold text-foreground">
                                    {formatPrice(order.total_amount - order.shipping_fee)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ค่าจัดส่ง:</span>
                                <span className="font-semibold">
                                    {order.shipping_fee === 0 ? (
                                        <span className="text-emerald-500 font-bold">ฟรี</span>
                                    ) : (
                                        formatPrice(order.shipping_fee)
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-baseline pt-2 border-t border-border">
                                <span className="font-bold text-foreground text-sm">ยอดสุทธิ:</span>
                                <span className="text-xl font-black text-primary">
                                    {formatPrice(order.total_amount)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Ordered Items List */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                            <Package className="size-4 text-primary" /> รายการสินค้าในคำสั่งซื้อนี้
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-border">
                            {order.items?.map((item) => {
                                const product = item.product;
                                return (
                                    <div
                                        key={item.id}
                                        className="py-3 flex items-center justify-between gap-4 text-xs"
                                    >
                                        <div className="flex items-center gap-3">
                                            {product?.image_url && (
                                                <img
                                                    src={product.image_url}
                                                    alt={item.product_name}
                                                    className="size-12 rounded-lg object-cover bg-muted/40 border border-border"
                                                />
                                            )}
                                            <div>
                                                <div className="font-bold text-foreground">
                                                    {item.product_name}
                                                </div>
                                                <div className="text-muted-foreground mt-0.5">
                                                    จำนวน {item.quantity} ชิ้น × {formatPrice(item.unit_price)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="font-black text-foreground text-sm text-right">
                                            {formatPrice(item.subtotal)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <Button asChild variant="outline" size="sm" className="gap-2">
                        <Link href="/shop">
                            <ArrowLeft className="size-3.5" /> เลือกซื้อสินค้าต่อ
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button asChild variant="secondary" size="sm" className="gap-1.5">
                            <Link href="/orders">
                                <Package className="size-3.5" /> ดูประวัติคำสั่งซื้อทั้งหมด
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

OrderShow.layout = (props: Props) => ({
    breadcrumbs: [
        {
            title: 'คำสั่งซื้อ (Orders)',
            href: '/orders',
        },
        {
            title: `#${props.order.order_number}`,
            href: `/orders/${props.order.order_number}`,
        },
    ],
});

