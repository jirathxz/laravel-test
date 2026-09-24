import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Wrench,
    Search,
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Laptop,
    Monitor,
    Cpu,
    ShieldCheck,
    Truck,
    Sparkles,
    FileText,
} from 'lucide-react';
import type { BreadcrumbItem, PaginatedData, RepairTicket } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Props {
    tickets: PaginatedData<RepairTicket> | null;
    isAuthenticated: boolean;
    errors: Record<string, string>;
}

export default function RepairsIndex({ tickets, isAuthenticated, errors }: Props) {
    const [searchCode, setSearchCode] = useState('');

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchCode.trim()) return;
        router.post('/repairs/track', { ticket_number: searchCode.trim() });
    };

    const formatPrice = (price: number | null) => {
        if (price === null) return '-';
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
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <Badge variant="outline" className="border-amber-500/40 text-amber-500 bg-amber-500/10 gap-1">
                        <Clock className="size-3" /> รอดำเนินการ
                    </Badge>
                );
            case 'inspecting':
                return (
                    <Badge variant="outline" className="border-cyan-500/40 text-cyan-500 bg-cyan-500/10 gap-1">
                        <Search className="size-3" /> กำลังตรวจสอบ
                    </Badge>
                );
            case 'in_progress':
                return (
                    <Badge variant="outline" className="border-blue-500/40 text-blue-500 bg-blue-500/10 gap-1">
                        <Wrench className="size-3" /> กำลังซ่อม
                    </Badge>
                );
            case 'waiting_parts':
                return (
                    <Badge variant="outline" className="border-purple-500/40 text-purple-500 bg-purple-500/10 gap-1">
                        <Clock className="size-3" /> รออะไหล่
                    </Badge>
                );
            case 'completed':
                return (
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-500 bg-emerald-500/10 gap-1">
                        <CheckCircle2 className="size-3" /> ซ่อมเสร็จสิ้น
                    </Badge>
                );
            case 'cancelled':
                return (
                    <Badge variant="destructive" className="gap-1">
                        <AlertCircle className="size-3" /> ยกเลิก
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getDeviceIcon = (deviceType: string) => {
        switch (deviceType) {
            case 'desktop':
                return <Monitor className="size-5 text-primary" />;
            case 'notebook':
            case 'macbook':
                return <Laptop className="size-5 text-primary" />;
            case 'component':
                return <Cpu className="size-5 text-primary" />;
            default:
                return <Wrench className="size-5 text-primary" />;
        }
    };

    return (
        <>
            <Head title="ศูนย์บริการแจ้งซ่อมคอมพิวเตอร์และโน้ตบุ๊ก | TechStore" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl w-full mx-auto">
                {/* Header Banner */}
                <Card className="relative overflow-hidden border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 md:p-10">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 size-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
                            <Sparkles className="size-3.5" /> ศูนย์บริการซ่อมมาตรฐาน อะไหล่แท้ 100%
                        </div>

                        <h1 className="text-2xl md:text-4xl font-black text-foreground tracking-tight leading-tight mb-3">
                            บริการแจ้งซ่อมคอมพิวเตอร์ <br />
                            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                PC, Notebook, MacBook & อัปเกรด
                            </span>
                        </h1>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            แจ้งซ่อมอุปกรณ์คอมพิวเตอร์ออนไลน์ได้ทันที ติดตามสถานะงานซ่อมแบบเรียลไทม์ ช่างชำนาญการตรวจเช็คอาการ ประเมินราคาก่อนเริ่มซ่อมทุกครั้ง
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <Button asChild size="lg" className="font-bold gap-2 bg-primary text-primary-foreground shadow-md hover:bg-primary/90">
                                <Link href="/repairs/create">
                                    <Plus className="size-4" /> แจ้งซ่อมอุปกรณ์ออนไลน์
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Tracking Search Card */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                            <Search className="size-4 text-primary" />
                            ติดตามสถานะงานซ่อม (Track Repair Ticket)
                        </CardTitle>
                        <CardDescription className="text-xs">
                            กรอกรหัสใบแจ้งซ่อม เช่น <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">REP-20260920-0001</code> เพื่อตรวจสอบความคืบหน้า
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2.5">
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    value={searchCode}
                                    onChange={(e) => setSearchCode(e.target.value)}
                                    placeholder="กรอกรหัสใบแจ้งซ่อม เช่น REP-20260920-0001"
                                    className="pl-9 h-11"
                                    required
                                />
                            </div>
                            <Button type="submit" className="h-11 font-bold px-6">
                                ตรวจสอบสถานะ
                            </Button>
                        </form>
                        {errors.ticket_number && (
                            <p className="text-xs text-destructive mt-2 font-medium">
                                {errors.ticket_number}
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Service Quality Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <Card className="border-border bg-card p-4">
                        <CardContent className="p-2 space-y-2">
                            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                                <ShieldCheck className="size-5" />
                            </div>
                            <h3 className="font-bold text-sm text-foreground">ตรวจเช็คฟรี & ประเมินราคาก่อน</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                แจ้งอาการและราคาชัดเจนก่อนลงมือซ่อม ไม่บวกเพิ่ม ไม่มีค่าใช้จ่ายแอบแฝง
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card p-4">
                        <CardContent className="p-2 space-y-2">
                            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                                <Cpu className="size-5" />
                            </div>
                            <h3 className="font-bold text-sm text-foreground">อะไหล่แท้ ประกันงานซ่อม</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                ใช้อะไหล่คุณภาพศูนย์แท้ 100% พร้อมรับประกันงานซ่อมนานสูงสุดถึง 90 วัน
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card p-4">
                        <CardContent className="p-2 space-y-2">
                            <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto">
                                <Truck className="size-5" />
                            </div>
                            <h3 className="font-bold text-sm text-foreground">บริการรับ-ส่งถึงที่</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                สะดวกสบายด้วยบริการนัดรับเครื่องถึงบ้าน หรือนำมาส่งที่หน้าร้านได้โดยตรง
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* User Repair History List (If logged in or tickets exist) */}
                {tickets && tickets.data.length > 0 && (
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <FileText className="size-5 text-primary" />
                                ประวัติใบแจ้งซ่อมของคุณ ({tickets.total} รายการ)
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {tickets.data.map((ticket) => (
                                <Card
                                    key={ticket.id}
                                    className="border-border bg-card hover:border-border/80 transition-colors"
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5">
                                        <div className="flex items-start gap-4">
                                            <div className="size-12 rounded-xl bg-muted/60 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                                                {getDeviceIcon(ticket.device_type)}
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="font-mono font-bold text-foreground text-sm">
                                                        #{ticket.ticket_number}
                                                    </span>
                                                    {getStatusBadge(ticket.status)}
                                                    {ticket.urgency === 'urgent' && (
                                                        <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                                                            ด่วน
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="text-sm font-semibold text-foreground">
                                                    {ticket.device_brand} {ticket.device_model}
                                                </div>

                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    อาการ: {ticket.problem_description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-border gap-2">
                                            <div className="text-right">
                                                <span className="text-[11px] text-muted-foreground block">
                                                    วันที่แจ้ง: {formatDate(ticket.created_at)}
                                                </span>
                                                <span className="text-xs font-bold text-primary">
                                                    {ticket.estimated_cost ? formatPrice(ticket.estimated_cost) : 'รอประเมินราคา'}
                                                </span>
                                            </div>

                                            <Button asChild size="sm" variant="outline" className="gap-1 text-xs">
                                                <Link href={`/repairs/${ticket.ticket_number}`}>
                                                    ดูสถานะ <ArrowRight className="size-3.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

RepairsIndex.layout = {
    breadcrumbs: [
        {
            title: 'บริการแจ้งซ่อม (Repair Service)',
            href: '/repairs',
        },
    ],
};
