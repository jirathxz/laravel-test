import { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import {
    Wrench,
    ArrowLeft,
    Monitor,
    Laptop,
    Apple,
    Cpu,
    CheckCircle2,
    Truck,
    Store,
    Clock,
    AlertCircle,
} from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import InputError from '@/components/input-error';

interface Props {
    defaultValues: {
        customer_name: string;
        customer_email: string;
        customer_phone: string;
        customer_address: string;
        service_type: string;
        urgency: string;
    };
}

const COMMON_SYMPTOMS = [
    'เปิดไม่ติด / ไฟไม่เข้า',
    'เปิดติดแต่ไม่ขึ้นภาพ (จอดำ)',
    'จอฟ้า (Blue Screen / BSOD)',
    'เครื่องร้อนจัด / พัดลมหมุนเสียงดัง',
    'ทำงานช้ามาก / ติดไวรัส-มัลแวร์',
    'แบตเตอรี่เสื่อม / บวม / ชาร์จไม่เข้า',
    'เปิดโปรแกรมแล้วค้าง / ดับเอง',
    'ต้องการอัปเกรด (RAM / SSD / การ์ดจอ)',
    'ลงระบบปฏิบัติการใหม่ (Windows / macOS)',
];

export default function RepairCreate({ defaultValues }: Props) {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        device_type: 'notebook',
        device_brand: '',
        device_model: '',
        serial_number: '',
        service_type: defaultValues.service_type || 'drop_off',
        problem_description: '',
        symptoms: [] as string[],
        urgency: defaultValues.urgency || 'normal',
        customer_name: defaultValues.customer_name || '',
        customer_phone: defaultValues.customer_phone || '',
        customer_email: defaultValues.customer_email || '',
        customer_address: defaultValues.customer_address || '',
    });

    const toggleSymptom = (symptom: string) => {
        let updated: string[];
        if (selectedSymptoms.includes(symptom)) {
            updated = selectedSymptoms.filter((s) => s !== symptom);
        } else {
            updated = [...selectedSymptoms, symptom];
        }
        setSelectedSymptoms(updated);
        setData('symptoms', updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/repairs');
    };

    return (
        <>
            <Head title="ส่งคำขอแจ้งซ่อมอุปกรณ์ | TechStore" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-4xl w-full mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-3">
                            <Wrench className="size-7 text-primary" />
                            ส่งคำขอแจ้งซ่อมอุปกรณ์
                        </h1>
                        <p className="text-muted-foreground text-xs mt-1">
                            กรอกรายละเอียดอุปกรณ์และอาการเสียเพื่อเปิดใบแจ้งซ่อม ช่างจะติดต่อกลับโดยเร็วที่สุด
                        </p>
                    </div>

                    <Button asChild variant="outline" size="sm" className="gap-1.5">
                        <Link href="/repairs">
                            <ArrowLeft className="size-3.5" /> ย้อนกลับ
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. Device Information */}
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <span className="size-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                    1
                                </span>
                                ข้อมูลอุปกรณ์ที่ต้องการซ่อม
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Device Type Selector */}
                            <div className="space-y-2">
                                <Label className="text-xs">ประเภทอุปกรณ์ <span className="text-destructive">*</span></Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {[
                                        { id: 'notebook', label: 'โน้ตบุ๊ก (Notebook)', icon: Laptop },
                                        { id: 'desktop', label: 'คอมตั้งโต๊ะ (PC/Desktop)', icon: Monitor },
                                        { id: 'macbook', label: 'MacBook / Mac', icon: Apple },
                                        { id: 'component', label: 'ชิ้นส่วน / อะไหล่', icon: Cpu },
                                    ].map((dev) => {
                                        const Icon = dev.icon;
                                        const isSelected = data.device_type === dev.id;
                                        return (
                                            <div
                                                key={dev.id}
                                                onClick={() => setData('device_type', dev.id)}
                                                className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all flex flex-col items-center gap-2 ${
                                                    isSelected
                                                        ? 'border-primary bg-primary/10 text-primary font-bold'
                                                        : 'border-border bg-card hover:border-muted-foreground/30 text-muted-foreground'
                                                }`}
                                            >
                                                <Icon className="size-5" />
                                                <span className="text-xs">{dev.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <InputError message={errors.device_type} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="device_brand" className="text-xs">
                                        แบรนด์ / ยี่ห้อ <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="device_brand"
                                        type="text"
                                        value={data.device_brand}
                                        onChange={(e) => setData('device_brand', e.target.value)}
                                        placeholder="เช่น ASUS, Acer, Dell, Apple, ประกอบเอง"
                                        required
                                    />
                                    <InputError message={errors.device_brand} />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="device_model" className="text-xs">
                                        ชื่อรุ่น / สเปก <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="device_model"
                                        type="text"
                                        value={data.device_model}
                                        onChange={(e) => setData('device_model', e.target.value)}
                                        placeholder="เช่น ROG Strix G16, MacBook Pro M1, Core i5"
                                        required
                                    />
                                    <InputError message={errors.device_model} />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="serial_number" className="text-xs text-muted-foreground">
                                    Serial Number / S/N (ถ้ามี)
                                </Label>
                                <Input
                                    id="serial_number"
                                    type="text"
                                    value={data.serial_number}
                                    onChange={(e) => setData('serial_number', e.target.value)}
                                    placeholder="เช่น C02G9988MD6R หรือระบุใต้ตัวเครื่อง"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Problem Description & Symptoms */}
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <span className="size-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                    2
                                </span>
                                อาการเสียและปัญหาที่พบ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Common Symptoms Pills */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    เลือกอาการเสียที่ตรงกับปัญหา (เลือกได้หลายข้อ):
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {COMMON_SYMPTOMS.map((sym) => {
                                        const isSelected = selectedSymptoms.includes(sym);
                                        return (
                                            <Button
                                                key={sym}
                                                type="button"
                                                variant={isSelected ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => toggleSymptom(sym)}
                                                className="text-xs h-8"
                                            >
                                                {isSelected && <CheckCircle2 className="size-3.5 mr-1" />}
                                                {sym}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Detailed Description */}
                            <div className="space-y-1.5">
                                <Label htmlFor="problem_description" className="text-xs">
                                    รายละเอียดอาการเสียเพิ่มเติม <span className="text-destructive">*</span>
                                </Label>
                                <textarea
                                    id="problem_description"
                                    rows={4}
                                    value={data.problem_description}
                                    onChange={(e) => setData('problem_description', e.target.value)}
                                    placeholder="ระบุอาการเสียอย่างละเอียด เช่น เกิดขึ้นเมื่อไหร่ มีเสียงเตือนไหม หรือก่อนหน้านี้ทำอะไรกับเครื่องมา"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                />
                                <InputError message={errors.problem_description} />
                            </div>

                            {/* Urgency & Service Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="space-y-2">
                                    <Label className="text-xs">ระดับความเร่งด่วน</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div
                                            onClick={() => setData('urgency', 'normal')}
                                            className={`p-3 rounded-lg border-2 cursor-pointer text-center transition-all ${
                                                data.urgency === 'normal'
                                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                                    : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <Clock className="size-4 mx-auto mb-1" />
                                            <span className="text-xs">งานปกติ (1-3 วัน)</span>
                                        </div>
                                        <div
                                            onClick={() => setData('urgency', 'urgent')}
                                            className={`p-3 rounded-lg border-2 cursor-pointer text-center transition-all ${
                                                data.urgency === 'urgent'
                                                    ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                                                    : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <AlertCircle className="size-4 mx-auto mb-1" />
                                            <span className="text-xs">งานด่วนพิเศษ</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs">รูปแบบการส่งซ่อม</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div
                                            onClick={() => setData('service_type', 'drop_off')}
                                            className={`p-3 rounded-lg border-2 cursor-pointer text-center transition-all ${
                                                data.service_type === 'drop_off'
                                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                                    : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <Store className="size-4 mx-auto mb-1" />
                                            <span className="text-xs">ส่งซ่อมที่หน้าร้าน</span>
                                        </div>
                                        <div
                                            onClick={() => setData('service_type', 'pickup')}
                                            className={`p-3 rounded-lg border-2 cursor-pointer text-center transition-all ${
                                                data.service_type === 'pickup'
                                                    ? 'border-primary bg-primary/10 text-primary font-bold'
                                                    : 'border-border bg-card text-muted-foreground'
                                            }`}
                                        >
                                            <Truck className="size-4 mx-auto mb-1" />
                                            <span className="text-xs">นัดรับที่บ้าน/ที่ทำงาน</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Customer Contact Info */}
                    <Card className="border-border bg-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                                <span className="size-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                                    3
                                </span>
                                ข้อมูลผู้ติดต่อ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="customer_name" className="text-xs">
                                        ชื่อ-นามสกุล <span className="text-destructive">*</span>
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
                                        เบอร์โทรศัพท์ติดต่อ <span className="text-destructive">*</span>
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
                                    อีเมลสำหรับรับแจ้งความคืบหน้า <span className="text-destructive">*</span>
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

                            {data.service_type === 'pickup' && (
                                <div className="space-y-1.5">
                                    <Label htmlFor="customer_address" className="text-xs">
                                        ที่อยู่นัดรับเครื่อง <span className="text-destructive">*</span>
                                    </Label>
                                    <textarea
                                        id="customer_address"
                                        rows={2}
                                        value={data.customer_address}
                                        onChange={(e) => setData('customer_address', e.target.value)}
                                        placeholder="ระบุบ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        required
                                    />
                                    <InputError message={errors.customer_address} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button asChild variant="outline">
                            <Link href="/repairs">ยกเลิก</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            size="lg"
                            className="font-bold px-8 bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                        >
                            {processing ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการส่งคำขอแจ้งซ่อม'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

RepairCreate.layout = {
    breadcrumbs: [
        {
            title: 'บริการแจ้งซ่อม',
            href: '/repairs',
        },
        {
            title: 'ส่งคำขอแจ้งซ่อมใหม่',
            href: '/repairs/create',
        },
    ],
};
