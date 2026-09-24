import { Head, Link } from '@inertiajs/react';
import {
    Package,
    Clock,
    CheckCircle2,
    Truck,
    ArrowRight,
    ShoppingBag,
    ArrowLeft,
    QrCode,
    Banknote,
} from 'lucide-react';
import type { Order, PaginatedData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
    orders: PaginatedData<Order>;
}



export default function OrderIndex({ orders }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <Head title="ประวัติคำสั่งซื้อ | TechStore" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-5xl w-full mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-3">
                            <Package className="size-7 text-primary" />
                            ประวัติคำสั่งซื้อ
                        </h1>
                        <p className="text-muted-foreground text-xs mt-1">
                            ตรวจสอบรายการคำสั่งซื้อ สถานะการชำระเงิน และการจัดส่ง
                        </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-1.5">
                        <Link href="/shop">
                            <ArrowLeft className="size-3.5" /> เลือกซื้อสินค้าต่อ
                        </Link>
                    </Button>
                </div>

                {orders.data.length === 0 ? (
                    <Card className="text-center py-16 px-6 border-border bg-card max-w-md mx-auto w-full">
                        <CardContent className="space-y-4">
                            <div className="size-16 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                                <ShoppingBag className="size-8" />
                            </div>
                            <h2 className="text-lg font-bold text-foreground">ยังไม่มีประวัติคำสั่งซื้อ</h2>
                            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs mx-auto">
                                คุณยังไม่มีรายการสั่งซื้อในระบบ เลือกดูสินค้าอุปกรณ์คอมพิวเตอร์และซอฟต์แวร์เพื่อเริ่มสั่งซื้อ
                            </p>
                            <Button asChild className="gap-2 font-bold">
                                <Link href="/shop">
                                    เลือกซื้อสินค้าทันที
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => {
                            const isPaid = order.payment_status === 'paid';
                            const isPromptPay = order.payment_method === 'promptpay';

                            return (
                                <Card
                                    key={order.id}
                                    className="border-border bg-card hover:border-border/80 transition-all overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-muted/20 border-b border-border text-xs">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-foreground text-sm">
                                                #{order.order_number}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {formatDate(order.created_at)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    isPaid
                                                        ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                                                        : 'border-amber-500/30 text-amber-500 bg-amber-500/10'
                                                }
                                            >
                                                {isPaid ? (
                                                    <span className="flex items-center gap-1">
                                                        <CheckCircle2 className="size-3" /> ชำระเงินแล้ว
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="size-3" /> รอชำระเงิน
                                                    </span>
                                                )}
                                            </Badge>

                                            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                                                {order.status === 'pending'
                                                    ? 'รอดำเนินการ'
                                                    : order.status === 'processing'
                                                      ? 'กำลังจัดเตรียม'
                                                      : 'จัดส่งแล้ว'}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Order Content */}
                                    <CardContent className="p-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                            {/* Items Preview */}
                                            <div className="md:col-span-8 space-y-2">
                                                {order.items?.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between text-xs"
                                                    >
                                                        <span className="font-medium text-foreground truncate max-w-xs sm:max-w-md">
                                                            {item.product_name}
                                                        </span>
                                                        <span className="text-muted-foreground ml-2 whitespace-nowrap">
                                                            x{item.quantity} ({formatPrice(item.subtotal)})
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Total & Action */}
                                            <div className="md:col-span-4 flex flex-col md:items-end justify-center pt-3 md:pt-0 border-t md:border-t-0 border-border">
                                                <div className="text-[11px] text-muted-foreground">ยอดรวมทั้งสิ้น</div>
                                                <div className="text-lg font-black text-primary mb-2">
                                                    {formatPrice(order.total_amount)}
                                                </div>

                                                <Button asChild size="sm" variant="outline" className="text-xs gap-1.5 w-full sm:w-auto">
                                                    <Link href={`/orders/${order.order_number}`}>
                                                        ดูรายละเอียด <ArrowRight className="size-3.5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border">
                                            <div className="flex items-center gap-1.5">
                                                {isPromptPay ? (
                                                    <QrCode className="size-3.5 text-primary" />
                                                ) : (
                                                    <Banknote className="size-3.5 text-emerald-500" />
                                                )}
                                                <span>
                                                    วิธีชำระเงิน:{' '}
                                                    <strong className="text-foreground">
                                                        {isPromptPay ? 'PromptPay QR' : 'เก็บเงินปลายทาง'}
                                                    </strong>
                                                </span>
                                            </div>

                                            <div className="truncate max-w-sm">
                                                จัดส่ง: {order.customer_name} ({order.shipping_address})
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {/* Pagination Links if multiple pages */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="flex justify-center gap-1 pt-4">
                                {orders.links.map((link, idx) => (
                                    <Button
                                        key={idx}
                                        asChild={Boolean(link.url)}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        disabled={!link.url}
                                        className="h-8 px-3 text-xs"
                                    >
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

OrderIndex.layout = {
    breadcrumbs: [
        {
            title: 'คำสั่งซื้อของฉัน (Orders)',
            href: '/orders',
        },
    ],
};

