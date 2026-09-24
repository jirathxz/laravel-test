# 🛒 TechStore - Computer Hardware & Software E-Commerce

เว็บแอปพลิเคชันร้านค้าออนไลน์สำหรับจำหน่ายอุปกรณ์คอมพิวเตอร์ (Hardware) และโปรแกรมลิขสิทธิ์แท้ (Software) พัฒนาด้วย **Laravel 12**, **Inertia.js v3 (React 19 + TypeScript)**, และ **Tailwind CSS v4**

---

## ✨ จุดเด่นและฟีเจอร์หลัก (Features)

### 🖥️ แคตตาล็อกและการเลือกดูสินค้า (Product Catalog)
- **ตัวกรองประเภทสินค้า (Type Filter)**: แยกดูเฉพาะอุปกรณ์คอมพิวเตอร์ (Hardware) หรือ ซอฟต์แวร์ลิขสิทธิ์แท้ (Software)
- **หมวดหมู่สินค้า (Categories)**: Processors (CPU), Graphics Cards (GPU), Memory (RAM), Storage (SSD/M.2), Motherboards, Power Supplies (PSU), Windows OS, Office Suite, DevTools, Antivirus
- **ระบบค้นหาและจัดเรียง (Search & Sorting)**: ค้นหาตามชื่อสินค้า แบรนด์ หรือคำอธิบาย พร้อมตัวเลือกจัดเรียงตามความนิยม ราคาต่ำ-สูง และสินค้ามาใหม่
- **หน้ารายละเอียดสินค้า (Product Detail)**: แสดงข้อมูลสเปกทางเทคนิค (Technical Specifications), สถานะสต็อกสินค้า, คำแนะนำสินค้าที่เกี่ยวข้อง

### 🛍️ ตะกร้าสินค้าและการคำนวณ (Shopping Cart)
- **ระบบตัวนับตะกร้าสินค้าแบบเรียลไทม์**: แสดงจำนวนสินค้าในตะกร้าบน Sidebar ตลอดเวลา
- **แถบแสดงสิทธิ์จัดส่งฟรี (Free Shipping Tracker)**: คำนวณความคืบหน้าส่งฟรีเมื่อยอดสั่งซื้อครบ 3,000 บาทโดยอัตโนมัติ
- **จัดการจำนวนสินค้า**: เพิ่ม/ลด/ลบสินค้า พร้อมระบบตรวจสอบสต็อกคงเหลือแบบเรียลไทม์

### 💳 การชำระเงินและสั่งซื้อ (Checkout & Payments)
- **รองรับทั้งสมาชิกและบุคคลทั่วไป (Guest Checkout)**: สามารถสั่งซื้อได้โดยไม่ต้องบังคับสมัครสมาชิก
- **ช่องทางการชำระเงิน**:
  - 📱 **PromptPay QR Code**: สร้าง QR Code อัตโนมัติตามยอดชำระเงิน พร้อมปุ่มจำลองการยืนยันชำระเงินในโหมดทดสอบ
  - 💵 **เก็บเงินปลายทาง (Cash on Delivery - COD)**: ชำระเงินสดเมื่อได้รับสินค้าถึงหน้าบ้าน
- **การตัดสต็อกสินค้าอัตโนมัติ (Database Transactions)**: มีระบบล็อคสต็อกและคืนสต็อกหากเกิดข้อผิดพลาด

### 📦 ประวัติคำสั่งซื้อและการติดตาม (Order Management)
- **หน้ารายละเอียดคำสั่งซื้อ (Order Details)**: แสดงเลขที่คำสั่งซื้อ (Copyable Order Number), รายการสินค้า, ข้อมูลการจัดส่ง, และสถานะการชำระเงิน
- **หน้าประวัติคำสั่งซื้อทั้งหมด (Order History)**: สมาชิกสามารถตรวจสอบคำสั่งซื้อย้อนหลังและสถานะการจัดส่งได้ทันที

### 🎨 ประสบการณ์การใช้งาน (UI/UX)
- **Sidebar Navigation**: รวมเมนูการนำทางไว้ที่ Sidebar ซ้ายมืออย่างเป็นสัดส่วน ไม่ซ้ำซ้อน
- **Native Component Library**: สร้างขึ้นด้วย Radix UI Primitives, Lucide Icons, และ Tailwind CSS Tokens รองรับการแสดงผลทุกขนาดหน้าจอ (Mobile, Tablet, Desktop)

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| ส่วนประกอบ | เทคโนโลยี |
| :--- | :--- |
| **Backend** | Laravel 12, PHP 8.3, SQLite / MySQL, Eloquent ORM |
| **Frontend** | Inertia.js v3, React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4, Lucide React Icons |
| **Components** | Radix UI, Shadcn/UI Design Tokens, Sonner Toaster |
| **Testing** | Pest PHP Testing Framework |
| **Code Quality** | Laravel Pint |

---

## 🚀 ขั้นตอนการติดตั้งและรันโปรเจกต์ (Getting Started)

### ความต้องการพื้นฐานของระบบ (Prerequisites)
- **PHP** >= 8.2 (แนะนำ PHP 8.3)
- **Composer** >= 2.0
- **Node.js** >= 20.0 & **NPM**

### 1. โคลนและติดตั้ง Dependencies
```bash
git clone https://github.com/jirathxz/techstore-laravel.git
cd techstore-laravel

# ติดตั้งแพ็กเกจ PHP
composer install

# ติดตั้งแพ็กเกจ Node.js
npm install
```

### 2. ตั้งค่าไฟล์สภาพแวดล้อม (.env)
```bash
cp .env.example .env
php artisan key:generate
```

ตรวจสอบการตั้งค่าฐานข้อมูลใน `.env` (ค่าเริ่มต้นใช้ SQLite):
```env
DB_CONNECTION=sqlite
APP_NAME="TechStore"
```

### 3. รัน Database Migration และ Seeder
สร้างตารางและนำเข้าข้อมูลหมวดหมู่สินค้าและอุปกรณ์คอมพิวเตอร์ตัวอย่าง:
```bash
php artisan migrate:fresh --seed
```

### 4. คอมไพล์ Frontend และเริ่มรันเซิร์ฟเวอร์
```bash
# คอมไพล์ Asset สำหรับ Production
npm run build

# หรือเปิดโหมด Development (Hot Reload)
npm run dev
```

เปิดเซิร์ฟเวอร์ PHP:
```bash
php artisan serve
```

เข้าใช้งานผ่านเว็บเบราว์เซอร์ได้ที่: **http://127.0.0.1:8000**

---

## 🧪 การทดสอบระบบ (Testing)

โปรเจกต์มีชุดการทดสอบครอบคลุมระบบร้านค้า ตะกร้าสินค้า และขั้นตอนการชำระเงินด้วย Pest PHP:
```bash
php artisan test
```

ตรวจสอบรูปแบบโค้ด (Code Formatting) ด้วย Laravel Pint:
```bash
vendor/bin/pint --format agent
```

---

## 📁 โครงสร้างโปรเจกต์สำคัญ (Project Structure)

```text
├── app/
│   ├── Http/Controllers/
│   │   ├── CartController.php       # ควบคุมระบบตะกร้าสินค้า
│   │   ├── CheckoutController.php   # ควบคุมการสั่งซื้อและชำระเงิน
│   │   ├── OrderController.php      # ควบคุมการแสดงประวัติคำสั่งซื้อ
│   │   └── ShopController.php       # แคตตาล็อกและการค้นหาสินค้า
│   └── Models/
│       ├── Category.php             # โมเดลหมวดหมู่สินค้า
│       ├── Product.php              # โมเดลสินค้า (Hardware/Software)
│       ├── CartItem.php             # โมเดลรายการในตะกร้า
│       ├── Order.php                # โมเดลคำสั่งซื้อ
│       └── OrderItem.php            # โมเดลรายการสินค้าในคำสั่งซื้อ
├── database/
│   ├── migrations/                  # ไฟล์สร้างตารางร้านค้า
│   └── seeders/
│       └── ShopSeeder.php           # ข้อมูลตัวอย่างสินค้าและหมวดหมู่
├── resources/
│   └── js/
│       ├── components/              # UI Components (Sidebar, Logo, Dialogs, Cards)
│       ├── layouts/                 # AppLayout (Sidebar Layout)
│       ├── pages/
│       │   ├── shop/                # หน้าหลักร้านค้า, รายละเอียดสินค้า, ตะกร้า, เช็คเอาท์
│       │   └── orders/              # หน้าแสดงคำสั่งซื้อและ QR Code ชำระเงิน
│       └── types/                   # TypeScript interfaces สำหรับร้านค้า
└── routes/
    └── web.php                      # เส้นทาง URL สำหรับระบบร้านค้า
```

---

## 📄 ใบอนุญาต (License)
โปรเจกต์นี้เปิดให้ใช้งานภายใต้ลิขสิทธิ์ [MIT License](LICENSE)
