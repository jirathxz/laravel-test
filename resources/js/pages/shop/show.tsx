import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ShoppingCart,
    Truck,
    ShieldCheck,
    RotateCcw,
    Plus,
    Minus,
    Monitor,
    Laptop,
    CheckCircle2,
    Sparkles,
} from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const isHardware = product.type === 'hardware';
    const inStock = product.stock > 0;



    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = (redirectAfter = false) => {
        if (!inStock) return;
        setIsAdding(true);
        router.post(
            '/cart',
            { product_id: product.id, quantity },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (redirectAfter) {
                        router.visit('/checkout');
                    }
                },
                onFinish: () => setIsAdding(false),
            },
        );
    };

    return (
        <>
            <Head title={`${product.name} | TechStore`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl w-full mx-auto">
                {/* Product Hero Card */}
                <Card className="border-border bg-card overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Product Image Column */}
                            <div className="lg:col-span-5 flex flex-col items-center">
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted/30 border border-border shadow-inner group">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            {isHardware ? (
                                                <Monitor className="size-20" />
                                            ) : (
                                                <Laptop className="size-20" />
                                            )}
                                        </div>
                                    )}

                                    <div className="absolute top-3 left-3 flex gap-1.5">
                                        <Badge variant={isHardware ? 'default' : 'secondary'} className="font-bold">
                                            {isHardware ? 'Hardware' : 'Software'}
                                        </Badge>
                                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                                            {product.brand}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info Column */}
                            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                                <div>
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                            {product.category?.name}
                                        </span>
                                        <div>
                                            {inStock ? (
                                                <Badge variant="outline" className="border-emerald-500/40 text-emerald-500 bg-emerald-500/10 gap-1">
                                                    <CheckCircle2 className="size-3.5" /> มีสินค้าในสต็อก ({product.stock} ชิ้น)
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    สินค้าหมดชั่วคราว
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-snug mb-4">
                                        {product.name}
                                    </h1>

                                    {/* Price Card */}
                                    <div className="p-4 rounded-xl bg-muted/40 border border-border mb-5 flex items-baseline justify-between">
                                        <div>
                                            <span className="text-xs text-muted-foreground block mb-0.5">
                                                ราคาพิเศษ (รวมภาษีมูลค่าเพิ่มแล้ว)
                                            </span>
                                            <span className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            ประกันศูนย์แท้ 100%
                                        </Badge>
                                    </div>

                                    {product.description && (
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                            {product.description}
                                        </p>
                                    )}
                                </div>

                                <Separator />

                                {/* Quantity & Actions */}
                                <div className="space-y-4">
                                    {inStock && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-muted-foreground">จำนวน:</span>
                                            <div className="flex items-center bg-muted/60 border border-border rounded-lg p-0.5">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                                    disabled={quantity <= 1}
                                                >
                                                    <Minus className="size-3.5" />
                                                </Button>
                                                <span className="w-10 text-center text-sm font-bold">
                                                    {quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                                    disabled={quantity >= product.stock}
                                                >
                                                    <Plus className="size-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Button
                                            onClick={() => handleAddToCart(false)}
                                            disabled={!inStock || isAdding}
                                            variant="outline"
                                            className="h-11 font-bold gap-2 text-sm"
                                        >
                                            <ShoppingCart className="size-4" />
                                            {isAdding ? 'กำลังเพิ่ม...' : 'เพิ่มลงในตะกร้า'}
                                        </Button>
                                        <Button
                                            onClick={() => handleAddToCart(true)}
                                            disabled={!inStock || isAdding}
                                            className="h-11 font-bold text-sm bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                                        >
                                            สั่งซื้อทันที (Buy Now)
                                        </Button>
                                    </div>

                                    {/* Assurance Row */}
                                    <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
                                        <div className="p-3 rounded-lg bg-muted/30 border border-border">
                                            <Truck className="size-4 text-primary mx-auto mb-1" />
                                            <div className="text-[11px] font-semibold">ส่งด่วนทั่วไทย</div>
                                            <div className="text-[10px] text-muted-foreground">1-2 วันทำการ</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-muted/30 border border-border">
                                            <ShieldCheck className="size-4 text-emerald-500 mx-auto mb-1" />
                                            <div className="text-[11px] font-semibold">ประกันศูนย์แท้</div>
                                            <div className="text-[10px] text-muted-foreground">เคลมศูนย์สบายใจ</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-muted/30 border border-border">
                                            <RotateCcw className="size-4 text-indigo-500 mx-auto mb-1" />
                                            <div className="text-[11px] font-semibold">เปลี่ยนคืนได้</div>
                                            <div className="text-[10px] text-muted-foreground">ภายใน 7 วัน</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Technical Specifications */}
                {product.specs && Object.keys(product.specs).length > 0 && (
                    <Card className="border-border bg-card">
                        <CardContent className="p-6">
                            <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                                <Sparkles className="size-4 text-primary" />
                                ข้อมูลจำเพาะทางเทคนิค (Specifications)
                            </h2>

                            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden bg-muted/10">
                                {Object.entries(product.specs).map(([key, value], idx) => (
                                    <div
                                        key={key}
                                        className={`grid grid-cols-1 sm:grid-cols-3 p-3 text-xs sm:text-sm ${
                                            idx % 2 === 0 ? 'bg-muted/20' : 'bg-transparent'
                                        }`}
                                    >
                                        <span className="font-semibold text-muted-foreground">{key}</span>
                                        <span className="sm:col-span-2 text-foreground font-medium mt-0.5 sm:mt-0">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                            <span className="size-2 rounded-full bg-primary" />
                            สินค้าอื่นที่น่าสนใจในหมวดหมู่นี้
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {relatedProducts.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/products/${rel.slug}`}
                                    className="group block"
                                >
                                    <Card className="h-full border-border bg-card hover:border-primary/50 transition-all">
                                        <CardContent className="p-4 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="aspect-square rounded-lg overflow-hidden bg-muted/40 mb-3 border border-border">
                                                    <img
                                                        src={rel.image_url || ''}
                                                        alt={rel.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                    />
                                                </div>
                                                <div className="text-[11px] text-muted-foreground mb-1">{rel.brand}</div>
                                                <h3 className="text-xs font-bold text-foreground group-hover:text-primary line-clamp-2 mb-2">
                                                    {rel.name}
                                                </h3>
                                            </div>
                                            <div className="text-sm font-extrabold text-primary pt-2">
                                                {formatPrice(rel.price)}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

ProductShow.layout = (props: Props) => ({
    breadcrumbs: [
        {
            title: 'ร้านค้า (Shop)',
            href: '/shop',
        },
        {
            title: props.product.type === 'hardware' ? 'ฮาร์ดแวร์' : 'ซอฟต์แวร์',
            href: `/shop?type=${props.product.type}`,
        },
        {
            title: props.product.name,
            href: `/products/${props.product.slug}`,
        },
    ],
});

