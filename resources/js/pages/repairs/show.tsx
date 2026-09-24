import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Wrench,
    Copy,
    CheckCircle2,
    Clock,
    Search,
    AlertCircle,
    ArrowLeft,
    Monitor,
    Laptop,
    Apple,
    Cpu,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Sparkles,
    FileText,
} from 'lucide-react';
import type { BreadcrumbItem, RepairTicket } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Props {
    ticket: RepairTicket;
}

const STATUS_STEPS = [
    { key: 'pending', label: 'ได้รับเรื่องแล้ว', desc: 'ลงทะเบียนคำขอซ่อมเข้าระบบ' },
    { key: 'inspecting', label: 'ตรวจสอบอาการ', desc: 'ช่างตรวจเช็คและประเมินราคา' },
    { key: 'in_progress', label: 'กำลังซ่อม', desc: 'ดำเนินการซ่อมและเปลี่ยนอุปกรณ์' },
    { key: 'waiting_parts', label: 'รออะไหล่', desc: 'รออะไหล่แท้จากศูนย์' },
    { key: 'completed', label: 'ซ่อมเสร็จสิ้น', desc: 'ผ่านการทดสอบ พร้อมส่งมอบ' },
];

export default function RepairShow({ ticket }: Props) {
    const [copied, setCopied] = useState(false);
    const [isAdvancing, setIsAdvancing] = useState(false);

    const handleCopyTicket = () => {
        navigator.clipboard.writeText(ticket.ticket_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAdvanceStatus = () => {
        setIsAdvancing(true);
        router.post(
            `/repairs/${ticket.id}/advance-status`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setIsAdvancing(false),
            },
        );
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Calculate active step index for stepper
    const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === ticket.status);
    const isCancelled = ticket.status === 'cancelled';

    return (
        <>
            <Head title={`ใบแจ้งซ่อม #${ticket.ticket_number} | TechStore`} />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-5xl w-full mx-auto">
                {/* Header Card */}
                <Card className="border-border bg-gradient-to-br from-card via-card to-muted/40 p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    ใบแจ้งซ่อมอุปกรณ์คอมพิวเตอร์
                                </span>
                                {ticket.urgency === 'urgent' && (
                                    <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
                                        งานด่วนพิเศษ
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black text-foreground font-mono flex items-center gap-2">
                                #{ticket.ticket_number}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7 text-muted-foreground hover:text-foreground"
                                    onClick={handleCopyTicket}
                                    title="คัดลอกรหัสใบแจ้งซ่อม"
                                >
                                    {copied ? <CheckCircle2 className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                                </Button>
                            </h1>

                            <p className="text-xs text-muted-foreground">
                                วันที่เปิดใบแจ้งซ่อม: {formatDate(ticket.created_at)}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm" className="gap-1.5">
                                <Link href="/repairs">
                                    <ArrowLeft className="size-3.5" /> กลับหน้าแจ้งซ่อม
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Status Stepper Card */}
                <Card className="border-border bg-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-bold text-foreground flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Clock className="size-4 text-primary" />
                                สถานะความคืบหน้างานซ่อม
                            </span>
                            <span className="text-xs font-normal text-muted-foreground">
                                อัปเดตล่าสุด: {formatDate(ticket.updated_at || ticket.created_at)}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isCancelled ? (
                            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-center text-destructive">
                                <AlertCircle className="size-8 mx-auto mb-2" />
                                <h3 className="font-bold text-sm">การแจ้งซ่อมนี้ถูกยกเลิกแล้ว</h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                                {STATUS_STEPS.map((step, idx) => {
                                    const isDone = currentStepIndex > idx || ticket.status === 'completed';
                                    const isCurrent = ticket.status === step.key;

                                    return (
                                        <div
                                            key={step.key}
                                            className={`p-3 rounded-xl border text-center transition-all ${
                                                isCurrent
                                                    ? 'border-primary bg-primary/10 shadow-sm'
                                                    : isDone
                                                      ? 'border-emerald-500/40 bg-emerald-500/5'
                                                      : 'border-border bg-muted/20 opacity-60'
                                            }`}
                                        >
                                            <div
                                                className={`size-7 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                                                    isCurrent
                                                        ? 'bg-primary text-primary-foreground'
                                                        : isDone
                                                          ? 'bg-emerald-500 text-white'
                                                          : 'bg-muted text-muted-foreground'
                                                }`}
                                            >
                                                {isDone ? <CheckCircle2 className="size-4" /> : idx + 1}
                                            </div>
                                            <div className="font-bold text-xs text-foreground mb-0.5">
                                                {step.label}
                                            </div>
                                            <div className="text-[10px] text-muted-foreground leading-tight">
                                                {step.desc}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Interactive Demo Action Button */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-muted/40 border border-border">
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <Sparkles className="size-3.5 text-primary" />
                                <span>ปุ่มทดสอบสำหรับอาจารย์/ผู้ตรวจ: ทดลองเลื่อนสถานะงานซ่อม</span>
                            </div>
                            <Button
                                onClick={handleAdvanceStatus}
                                disabled={isAdvancing}
                                size="sm"
                                variant="secondary"
                                className="font-bold text-xs gap-1.5 w-full sm:w-auto"
                            >
                                <Wrench className="size-3.5" />
                                {isAdvancing ? 'กำลังอัปเดต...' : 'จำลองอัปเดตขั้นตอนถัดไป (Advance Demo)'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left: Device & Problem Info */}
                    <div className="md:col-span-7 space-y-6">
                        {/* Device Info */}
                        <Card className="border-border bg-card">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Laptop className="size-4 text-primary" /> รายละเอียดเครื่องที่ส่งซ่อม
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">ประเภทอุปกรณ์:</span>
                                    <span className="font-bold text-foreground capitalize">
                                        {ticket.device_type}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">ยี่ห้อ / แบรนด์:</span>
                                    <span className="font-bold text-foreground">
                                        {ticket.device_brand}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">รุ่น / Model:</span>
                                    <span className="font-bold text-foreground">
                                        {ticket.device_model}
                                    </span>
                                </div>
                                {ticket.serial_number && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Serial Number:</span>
                                        <span className="font-mono font-medium text-foreground">
                                            {ticket.serial_number}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">รูปแบบการส่งซ่อม:</span>
                                    <span className="font-medium text-foreground">
                                        {ticket.service_type === 'drop_off'
                                            ? 'ส่งซ่อมที่หน้าร้าน'
                                            : 'นัดรับที่บ้าน/ที่ทำงาน'}
                                    </span>
                                </div>

                                <Separator />

                                <div>
                                    <span className="text-muted-foreground block mb-1">อาการเสียที่ระบุ:</span>
                                    <p className="text-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border border-border">
                                        {ticket.problem_description}
                                    </p>
                                </div>

                                {ticket.symptoms && ticket.symptoms.length > 0 && (
                                    <div>
                                        <span className="text-muted-foreground block mb-1.5">หมวดหมู่อาการ:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {ticket.symptoms.map((sym, idx) => (
                                                <Badge key={idx} variant="outline" className="text-[10px]">
                                                    {sym}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Technician Notes & Cost & Customer Contact */}
                    <div className="md:col-span-5 space-y-6">
                        {/* Technician Notes & Cost */}
                        <Card className="border-border bg-card">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Wrench className="size-4 text-primary" /> ผลการตรวจเช็คและราคาประเมิน
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-1">
                                    <span className="text-xs text-muted-foreground block">
                                        ราคาประเมินงานซ่อม (รวมค่าแรงและอะไหล่)
                                    </span>
                                    <span className="text-2xl font-black text-primary">
                                        {ticket.estimated_cost
                                            ? formatPrice(ticket.estimated_cost)
                                            : 'รอช่างประเมินราคา'}
                                    </span>
                                </div>

                                <div className="space-y-1.5 text-xs">
                                    <span className="font-semibold text-foreground block">
                                        บันทึกความเห็นจากช่างผู้เชี่ยวชาญ:
                                    </span>
                                    <div className="p-3 rounded-lg bg-muted/20 border border-border text-foreground leading-relaxed">
                                        {ticket.technician_notes || 'ช่างกำลังตรวจเช็คอาการและเตรียมแจ้งรายละเอียด'}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Contact Card */}
                        <Card className="border-border bg-card">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Phone className="size-4 text-primary" /> ข้อมูลผู้ส่งซ่อม
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2.5 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">ชื่อผู้ส่งซ่อม:</span>
                                    <span className="font-semibold text-foreground">{ticket.customer_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">เบอร์โทรศัพท์:</span>
                                    <span className="font-semibold text-foreground">{ticket.customer_phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">อีเมล:</span>
                                    <span className="font-semibold text-foreground">{ticket.customer_email}</span>
                                </div>
                                {ticket.customer_address && (
                                    <div className="pt-1">
                                        <span className="text-muted-foreground block mb-0.5">ที่อยู่นัดรับ:</span>
                                        <span className="text-foreground">{ticket.customer_address}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

RepairShow.layout = (props: Props) => ({
    breadcrumbs: [
        {
            title: 'บริการแจ้งซ่อม',
            href: '/repairs',
        },
        {
            title: `#${props.ticket.ticket_number}`,
            href: `/repairs/${props.ticket.ticket_number}`,
        },
    ],
});
