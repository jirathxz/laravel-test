import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Cpu,
    Monitor,
    Laptop,
    HardDrive,
    Database,
    Zap,
    Box,
    FileSpreadsheet,
    ShieldCheck,
    Code2,
    CircuitBoard,
    ShoppingCart,
    Search,
    ArrowUpDown,
    Tag,
    Sparkles,
} from 'lucide-react';
import type { Category, PaginatedData, Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Props {
    products: PaginatedData<Product>;
    categories: Category[];
    filters: {
        search: string;
        type: string;
        category: string;
        sort: string;
    };
}



export default function ShopIndex({ products, categories, filters }: Props) {
    const [addingId, setAddingId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value };
        if (key === 'type' && value !== '') {
            newFilters.category = '';
        }
        router.get('/shop', newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        handleFilterChange('search', searchQuery);
    };

    const handleAddToCart = (productId: number, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAddingId(productId);
        router.post(
            '/cart',
            { product_id: productId, quantity: 1 },
            {
                preserveScroll: true,
                onFinish: () => setAddingId(null),
            },
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getCategoryIcon = (iconName: string | null) => {
        switch (iconName) {
            case 'Cpu':
                return <Cpu className="size-4" />;
            case 'Monitor':
                return <Monitor className="size-4" />;
            case 'HardDrive':
                return <HardDrive className="size-4" />;
            case 'Database':
                return <Database className="size-4" />;
            case 'CircuitBoard':
                return <CircuitBoard className="size-4" />;
            case 'Zap':
                return <Zap className="size-4" />;
            case 'Box':
                return <Box className="size-4" />;
            case 'Laptop':
                return <Laptop className="size-4" />;
            case 'FileSpreadsheet':
                return <FileSpreadsheet className="size-4" />;
            case 'ShieldCheck':
                return <ShieldCheck className="size-4" />;
            case 'Code2':
                return <Code2 className="size-4" />;
            default:
                return <Tag className="size-4" />;
        }
    };

    const filteredCategories = categories.filter((c) => {
        if (!filters.type) return true;
        return c.type === filters.type;
    });

    return (
        <>
            <Head title="ร้านค้าอุปกรณ์คอมพิวเตอร์ Hardware & Software" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-7xl w-full mx-auto">
                {/* Hero Banner Card */}
                <Card className="relative overflow-hidden border-border bg-gradient-to-br from-card via-card to-muted/40 py-8 px-6 md:px-10">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 size-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
                            <Sparkles className="size-3.5" /> คอมพิวเตอร์ฮาร์ดแวร์ & ซอฟต์แวร์ครบวงจร
                        </div>

                        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3 leading-tight">
                            อัปเกรดคอมพิวเตอร์ <br />
                            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                แรงเต็มสปีด ลิขสิทธิ์แท้ 100%
                            </span>
                        </h1>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            เลือกซื้ออุปกรณ์คอมพิวเตอร์ ซีพียู การ์ดจอ แรม SSD และโปรแกรมซอฟต์แวร์ Windows, Office, DevTools ประกันศูนย์แท้ พร้อมส่งด่วนทั่วไทย
                        </p>

                        {/* Quick Type Switcher Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant={filters.type === '' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleFilterChange('type', '')}
                                className="font-semibold"
                            >
                                ทั้งหมด ({categories.reduce((acc, c) => acc + (c.products_count || 0), 0)})
                            </Button>
                            <Button
                                variant={filters.type === 'hardware' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleFilterChange('type', 'hardware')}
                                className="gap-1.5 font-semibold"
                            >
                                <Monitor className="size-4" /> ฮาร์ดแวร์ (Hardware)
                            </Button>
                            <Button
                                variant={filters.type === 'software' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleFilterChange('type', 'software')}
                                className="gap-1.5 font-semibold"
                            >
                                <Laptop className="size-4" /> ซอฟต์แวร์ (Software)
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Category Pills Navigation */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            หมวดหมู่สินค้า
                        </span>
                        {filters.category && (
                            <button
                                onClick={() => handleFilterChange('category', '')}
                                className="text-xs text-primary hover:underline cursor-pointer"
                            >
                                ล้างตัวกรองหมวดหมู่
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                        <Button
                            variant={filters.category === '' ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => handleFilterChange('category', '')}
                            className="text-xs h-8 whitespace-nowrap"
                        >
                            ทั้งหมด
                        </Button>
                        {filteredCategories.map((cat) => {
                            const isActive = filters.category === cat.slug;
                            return (
                                <Button
                                    key={cat.id}
                                    variant={isActive ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleFilterChange('category', isActive ? '' : cat.slug)}
                                    className="gap-1.5 text-xs h-8 whitespace-nowrap"
                                >
                                    {getCategoryIcon(cat.icon)}
                                    <span>{cat.name}</span>
                                    {cat.products_count !== undefined && (
                                        <Badge variant={isActive ? 'outline' : 'secondary'} className="ml-0.5 px-1 py-0 text-[10px]">
                                            {cat.products_count}
                                        </Badge>
                                    )}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Search Bar & Sorting Controls */}
                <Card className="p-3 border-border bg-card">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        {/* Search input form */}
                        <form onSubmit={handleSearch} className="flex-1 w-full max-w-md">
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="ค้นหาสินค้า (ซีพียู, การ์ดจอ, Windows, Office)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pr-9 h-9 text-xs"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <Search className="size-4" />
                                </button>
                            </div>
                        </form>

                        {/* Results Count & Sorting */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto text-xs text-muted-foreground">
                            <span>พบ <strong className="text-foreground">{products.total}</strong> รายการ</span>

                            <div className="flex items-center gap-1.5">
                                <ArrowUpDown className="size-3.5" />
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="bg-background border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                                >
                                    <option value="featured">สินค้าแนะนำ</option>
                                    <option value="price_low">ราคา: ต่ำสุด - สูงสุด</option>
                                    <option value="price_high">ราคา: สูงสุด - ต่ำสุด</option>
                                    <option value="newest">มาใหม่ล่าสุด</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Products Grid */}
                {products.data.length === 0 ? (
                    <Card className="text-center py-16 p-6">
                        <Search className="size-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="text-base font-bold text-foreground mb-1">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองเพื่อดูรายการสินค้าทั้งหมด
                        </p>
                        <Button
                            onClick={() => {
                                setSearchQuery('');
                                router.get('/shop');
                            }}
                            variant="outline"
                            size="sm"
                            className="mx-auto"
                        >
                            ล้างตัวกรองทั้งหมด
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.data.map((product) => {
                            const isHardware = product.type === 'hardware';
                            const inStock = product.stock > 0;

                            return (
                                <Card
                                    key={product.id}
                                    className="group overflow-hidden flex flex-col justify-between py-0 gap-0 border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md"
                                >
                                    {/* Image Box */}
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="relative aspect-square w-full bg-muted/20 overflow-hidden block"
                                    >
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                {isHardware ? <Monitor className="size-10" /> : <Laptop className="size-10" />}
                                            </div>
                                        )}

                                        {/* Badges */}
                                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                                            <Badge variant={isHardware ? 'default' : 'secondary'} className="text-[10px] font-bold uppercase">
                                                {isHardware ? 'Hardware' : 'Software'}
                                            </Badge>
                                            <Badge variant="outline" className="bg-background/80 backdrop-blur-xs text-[10px]">
                                                {product.brand}
                                            </Badge>
                                        </div>

                                        <div className="absolute bottom-2.5 right-2.5">
                                            <Badge
                                                variant={inStock ? 'outline' : 'destructive'}
                                                className={`text-[10px] backdrop-blur-xs ${inStock ? 'bg-background/90 text-emerald-500 border-emerald-500/40' : ''}`}
                                            >
                                                {inStock ? `มีสินค้า (${product.stock})` : 'สินค้าหมด'}
                                            </Badge>
                                        </div>
                                    </Link>

                                    {/* Content */}
                                    <CardContent className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="text-[11px] text-muted-foreground mb-1">
                                                {product.category?.name}
                                            </div>
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2"
                                            >
                                                {product.name}
                                            </Link>

                                            {/* Specs snippet */}
                                            {product.specs && Object.keys(product.specs).length > 0 && (
                                                <div className="text-[11px] text-muted-foreground bg-muted/40 rounded-md p-2 mb-3 space-y-0.5">
                                                    {Object.entries(product.specs)
                                                        .slice(0, 2)
                                                        .map(([k, v]) => (
                                                            <div key={k} className="truncate">
                                                                <span className="text-muted-foreground/80">{k}:</span> {v}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Price & Add to Cart */}
                                        <div className="pt-2 border-t border-border flex items-center justify-between gap-2 mt-auto">
                                            <div>
                                                <span className="text-[10px] text-muted-foreground block">ราคาพิเศษ</span>
                                                <span className="text-sm sm:text-base font-extrabold text-primary">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>

                                            <Button
                                                size="sm"
                                                variant={inStock ? 'default' : 'secondary'}
                                                disabled={!inStock || addingId === product.id}
                                                onClick={(e) => handleAddToCart(product.id, e)}
                                                className="size-9 p-0 rounded-lg cursor-pointer"
                                                title={inStock ? 'เพิ่มลงในตะกร้า' : 'สินค้าหมด'}
                                            >
                                                <ShoppingCart className="size-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {products.links && products.links.length > 3 && (
                    <div className="flex justify-center items-center gap-1 mt-6">
                        {products.links.map((link, idx) => {
                            if (!link.url) {
                                return (
                                    <span
                                        key={idx}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="px-3 py-1.5 text-xs text-muted-foreground select-none"
                                    />
                                );
                            }

                            return (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-card border-border text-foreground hover:bg-muted'
                                    }`}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

ShopIndex.layout = {
    breadcrumbs: [
        {
            title: 'ร้านค้า (Shop)',
            href: '/shop',
        },
    ],
};

