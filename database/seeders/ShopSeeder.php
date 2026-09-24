<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Categories
        $categories = [
            // Hardware
            [
                'name' => 'Processors (CPU)',
                'slug' => 'processors-cpu',
                'type' => 'hardware',
                'description' => 'โปรเซสเซอร์ประสิทธิภาพสูงสำหรับการเล่นเกมและทำงานหนัก',
                'icon' => 'Cpu',
            ],
            [
                'name' => 'Graphics Cards (GPU)',
                'slug' => 'graphics-cards-gpu',
                'type' => 'hardware',
                'description' => 'การ์ดจอแยกสำหรับกราฟิก ตัดต่อ และเกมมิ่งความละเอียดสูง',
                'icon' => 'Monitor',
            ],
            [
                'name' => 'Memory (RAM)',
                'slug' => 'memory-ram',
                'type' => 'hardware',
                'description' => 'หน่วยความจำ DDR4 / DDR5 ความเร็วสูง',
                'icon' => 'HardDrive',
            ],
            [
                'name' => 'Storage (SSD / M.2)',
                'slug' => 'storage-ssd',
                'type' => 'hardware',
                'description' => 'ไดรฟ์ SSD NVMe PCIe 4.0/5.0 อ่านเขียนความเร็วสูง',
                'icon' => 'Database',
            ],
            [
                'name' => 'Motherboards (Mainboard)',
                'slug' => 'motherboards',
                'type' => 'hardware',
                'description' => 'เมนบอร์ดรองรับ Intel และ AMD ชิปเซ็ตล่าสุด',
                'icon' => 'CircuitBoard',
            ],
            [
                'name' => 'Power Supply (PSU)',
                'slug' => 'power-supply-psu',
                'type' => 'hardware',
                'description' => 'พาวเวอร์ซัพพลายมาตรฐาน 80 Plus ประหยัดพลังงาน เสถียร',
                'icon' => 'Zap',
            ],
            [
                'name' => 'PC Cases',
                'slug' => 'pc-cases',
                'type' => 'hardware',
                'description' => 'เคสคอมพิวเตอร์ดีไซน์สวยงาม ระบายความร้อนยอดเยี่ยม',
                'icon' => 'Box',
            ],
            // Software
            [
                'name' => 'Operating Systems',
                'slug' => 'operating-systems',
                'type' => 'software',
                'description' => 'ระบบปฏิบัติการลิขสิทธิ์แท้ Windows 11 OEM/FPP',
                'icon' => 'Laptop',
            ],
            [
                'name' => 'Office & Productivity',
                'slug' => 'office-productivity',
                'type' => 'software',
                'description' => 'โปรแกรมออฟฟิศ ลิขสิทธิ์แท้สำหรับการทำงานและธุรกิจ',
                'icon' => 'FileSpreadsheet',
            ],
            [
                'name' => 'Security & Antivirus',
                'slug' => 'security-antivirus',
                'type' => 'software',
                'description' => 'โปรแกรมป้องกันไวรัส ความปลอดภัยและปกป้องข้อมูลส่วนตัว',
                'icon' => 'ShieldCheck',
            ],
            [
                'name' => 'Developer Tools',
                'slug' => 'developer-tools',
                'type' => 'software',
                'description' => 'เครื่องมือและ IDE สำหรับนักพัฒนาซอฟต์แวร์ระดับมืออาชีพ',
                'icon' => 'Code2',
            ],
        ];

        $createdCategories = [];
        foreach ($categories as $cat) {
            $createdCategories[$cat['slug']] = Category::updateOrCreate(
                ['slug' => $cat['slug']],
                $cat
            );
        }

        // 2. Products
        $products = [
            // CPU
            [
                'category_slug' => 'processors-cpu',
                'name' => 'AMD Ryzen 7 7800X3D (AM5)',
                'slug' => 'amd-ryzen-7-7800x3d',
                'brand' => 'AMD',
                'type' => 'hardware',
                'price' => 16500.00,
                'stock' => 12,
                'description' => 'ซีพียูเกมมิ่งที่ดีที่สุดด้วยเทคโนโลยี 3D V-Cache 8 คอร์ 16 เธรด พร้อมแคชรวมถึง 104MB',
                'specs' => [
                    'Socket' => 'AM5',
                    'Cores / Threads' => '8 Cores / 16 Threads',
                    'Base / Boost Clock' => '4.2 GHz / 5.0 GHz',
                    'L3 Cache' => '96MB 3D V-Cache',
                    'TDP' => '120W',
                    'Warranty' => '3 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],
            [
                'category_slug' => 'processors-cpu',
                'name' => 'Intel Core i7-14700K (LGA1700)',
                'slug' => 'intel-core-i7-14700k',
                'brand' => 'Intel',
                'type' => 'hardware',
                'price' => 15900.00,
                'stock' => 10,
                'description' => 'ประสิทธิภาพสูงสุดทั้งงานตัดต่อและเกมมิ่ง 20 คอร์ 28 เธรด พร้อมความเร็ว Boost สูงสุด 5.6 GHz',
                'specs' => [
                    'Socket' => 'LGA1700',
                    'Cores / Threads' => '20 (8P+12E) / 28 Threads',
                    'Max Turbo Frequency' => '5.6 GHz',
                    'Intel Smart Cache' => '33MB',
                    'TDP' => '125W - 253W',
                    'Warranty' => '3 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],

            // GPU
            [
                'category_slug' => 'graphics-cards-gpu',
                'name' => 'ASUS ROG Strix GeForce RTX 4080 SUPER 16GB GDDR6X OC',
                'slug' => 'asus-rog-strix-rtx-4080-super',
                'brand' => 'ASUS',
                'type' => 'hardware',
                'price' => 45900.00,
                'stock' => 5,
                'description' => 'การ์ดจอระดับไฮเอนด์ พัดลมระบายความร้อน Axial-tech และไฟ Aura Sync RGB พร้อม DLSS 3.5 และ Ray Tracing เต็มรูปแบบ',
                'specs' => [
                    'GPU Architecture' => 'Ada Lovelace',
                    'Video Memory' => '16GB GDDR6X',
                    'Memory Bus' => '256-bit',
                    'Recommended PSU' => '750W / 850W',
                    'Outputs' => '2x HDMI 2.1a, 3x DisplayPort 1.4a',
                    'Warranty' => '3 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],
            [
                'category_slug' => 'graphics-cards-gpu',
                'name' => 'MSI GeForce RTX 4060 Ti Gaming X 8GB',
                'slug' => 'msi-rtx-4060-ti-gaming-x',
                'brand' => 'MSI',
                'type' => 'hardware',
                'price' => 15500.00,
                'stock' => 18,
                'description' => 'การ์ดจอขวัญใจเกมเมอร์ระดับ 1080p และ 1440p ประหยัดพลังงาน พัดลม TWIN FROZR 9 เงียบสนิท',
                'specs' => [
                    'Video Memory' => '8GB GDDR6',
                    'Memory Bus' => '128-bit',
                    'Boost Clock' => '2640 MHz',
                    'Recommended PSU' => '550W',
                    'Warranty' => '3 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=60',
                'is_featured' => false,
            ],

            // RAM
            [
                'category_slug' => 'memory-ram',
                'name' => 'CORSAIR Vengeance RGB DDR5 32GB (2x16GB) 6000MHz CL30',
                'slug' => 'corsair-vengeance-rgb-ddr5-32gb',
                'brand' => 'Corsair',
                'type' => 'hardware',
                'price' => 4890.00,
                'stock' => 25,
                'description' => 'แรม DDR5 บัส 6000MHz ค่า CL ต่ำพิเศษ (CL30) พร้อมไฟ RGB สวยงาม รองรับ Intel XMP และ AMD EXPO',
                'specs' => [
                    'Memory Type' => 'DDR5 Desktop',
                    'Capacity' => '32GB (16GB x 2)',
                    'Speed' => '6000 MHz',
                    'Latency' => 'CL30-36-36-76',
                    'Voltage' => '1.40V',
                    'Warranty' => 'Lifetime Warranty',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],

            // Storage SSD
            [
                'category_slug' => 'storage-ssd',
                'name' => 'SAMSUNG 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
                'slug' => 'samsung-990-pro-2tb',
                'brand' => 'Samsung',
                'type' => 'hardware',
                'price' => 6990.00,
                'stock' => 14,
                'description' => 'SSD ตัวท็อปความเร็วอ่านสูงสุด 7,450 MB/s และเขียน 6,900 MB/s สำหรับโหลดเกมและตัดต่อวิดีโอ 4K/8K แบบเรียลไทม์',
                'specs' => [
                    'Interface' => 'PCIe Gen 4.0 x4, NVMe 2.0',
                    'Capacity' => '2,000 GB (2TB)',
                    'Sequential Read' => 'Up to 7,450 MB/s',
                    'Sequential Write' => 'Up to 6,900 MB/s',
                    'TBW' => '1200 TBW',
                    'Warranty' => '5 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],

            // Motherboard
            [
                'category_slug' => 'motherboards',
                'name' => 'ASUS ROG STRIX B650-A GAMING WIFI',
                'slug' => 'asus-rog-strix-b650-a-gaming-wifi',
                'brand' => 'ASUS',
                'type' => 'hardware',
                'price' => 9290.00,
                'stock' => 8,
                'description' => 'เมนบอร์ดธีมสีเงิน-ขาว สวยงามลงตัวสำหรับ AM5 พร้อมภาคจ่ายไฟ 12+2 เฟส, PCIe 5.0 M.2 และ WiFi 6E',
                'specs' => [
                    'CPU Socket' => 'AMD Socket AM5 for Ryzen 7000/8000/9000',
                    'Form Factor' => 'ATX',
                    'Memory Slots' => '4x DDR5 Up to 7600+(OC)',
                    'Storage' => '3x M.2 Slots, 4x SATA 6Gb/s',
                    'Wireless' => 'Wi-Fi 6E + Bluetooth 5.2',
                    'Warranty' => '3 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
                'is_featured' => false,
            ],

            // PSU
            [
                'category_slug' => 'power-supply-psu',
                'name' => 'CORSAIR RM850e 850W 80 PLUS Gold Fully Modular ATX 3.0',
                'slug' => 'corsair-rm850e-850w-atx3',
                'brand' => 'Corsair',
                'type' => 'hardware',
                'price' => 4590.00,
                'stock' => 15,
                'description' => 'พาวเวอร์ซัพพลายมาตรฐาน ATX 3.0 และ PCIe 5.0 มาพร้อมสาย 12VHPWR สำหรับการ์ดจอ RTX 40 Series โดยเฉพาะ',
                'specs' => [
                    'Wattage' => '850 Watts',
                    'Certification' => '80 PLUS Gold',
                    'Modular' => 'Fully Modular',
                    'Standards' => 'ATX 3.0 & PCIe 5.0',
                    'Warranty' => '7 Years',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&auto=format&fit=crop&q=60',
                'is_featured' => false,
            ],

            // Case
            [
                'category_slug' => 'pc-cases',
                'name' => 'LIAN LI O11 Dynamic EVO RGB - Black',
                'slug' => 'lian-li-o11-dynamic-evo-rgb-black',
                'brand' => 'Lian Li',
                'type' => 'hardware',
                'price' => 5990.00,
                'stock' => 9,
                'description' => 'เคสกระจกนิรภัยพาโนรามา ปรับรูปแบบการติดตั้งได้หลายทิศทาง มีไฟ ARGB แถบคู่ด้านบน-ล่าง สวยหรูระดับพรีเมียม',
                'specs' => [
                    'Type' => 'Mid-Tower Chassis',
                    'Material' => 'Aluminum, Steel, 4.0mm Tempered Glass',
                    'Motherboard Support' => 'E-ATX / ATX / Micro-ATX / Mini-ITX',
                    'Fan Support' => 'Up to 10 Fans',
                    'Radiator Support' => 'Top/Side/Bottom up to 360mm',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],

            // SOFTWARE 1: OS
            [
                'category_slug' => 'operating-systems',
                'name' => 'Microsoft Windows 11 Pro 64-bit English (FPP/Retail Box)',
                'slug' => 'windows-11-pro-fpp',
                'brand' => 'Microsoft',
                'type' => 'software',
                'price' => 7490.00,
                'stock' => 50,
                'description' => 'ระบบปฏิบัติการลิขสิทธิ์แท้ FPP สามารถย้ายเครื่องได้ รองรับ BitLocker, Windows Sandbox, Remote Desktop และฟีเจอร์ระดับองค์กร',
                'specs' => [
                    'License Type' => 'FPP (Full Packaged Product) / ย้ายเครื่องได้',
                    'System Architecture' => '64-bit Only',
                    'Media' => 'USB Flash Drive / Digital Key',
                    'Security' => 'BitLocker Drive Encryption, TPM 2.0',
                    'Language' => 'English / Multilingual',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],
            [
                'category_slug' => 'operating-systems',
                'name' => 'Microsoft Windows 11 Home 64-bit (OEM/COA)',
                'slug' => 'windows-11-home-oem',
                'brand' => 'Microsoft',
                'type' => 'software',
                'price' => 4290.00,
                'stock' => 40,
                'description' => 'Windows 11 Home ลิขสิทธิ์แท้แบบ OEM สำหรับประกอบเครื่องใหม่ ตอบโจทย์การใช้งานทั่วไป เกม และสตรีมมิ่ง',
                'specs' => [
                    'License Type' => 'OEM (ผูกกับเมนบอร์ดเครื่องแรก)',
                    'System Architecture' => '64-bit',
                    'Language' => 'English / Thai Supported',
                    'DirectX' => 'DirectX 12 Ultimate Support',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
                'is_featured' => false,
            ],

            // SOFTWARE 2: Office
            [
                'category_slug' => 'office-productivity',
                'name' => 'Microsoft Office Home & Business 2024 (One-time purchase PC/Mac)',
                'slug' => 'office-home-business-2024',
                'brand' => 'Microsoft',
                'type' => 'software',
                'price' => 9990.00,
                'stock' => 30,
                'description' => 'ชุดโปรแกรม Word, Excel, PowerPoint, Outlook และ OneNote เวอร์ชันล่าสุด 2024 ซื้อครั้งเดียวใช้งานได้ตลอดชีพ ไม่มีค่าบริการรายปี',
                'specs' => [
                    'License' => 'Lifetime License (1 PC or Mac)',
                    'Included Apps' => 'Word, Excel, PowerPoint, Outlook, OneNote',
                    'Platform' => 'Windows 11, Windows 10, macOS',
                    'Commercial Use' => 'ได้รับอนุญาตให้ใช้เชิงพาณิชย์',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1542744094-3a317272350c?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],
            [
                'category_slug' => 'office-productivity',
                'name' => 'Microsoft 365 Family (6 Users / 1 Year Subscription)',
                'slug' => 'microsoft-365-family-1-year',
                'brand' => 'Microsoft',
                'type' => 'software',
                'price' => 2890.00,
                'stock' => 100,
                'description' => 'แชร์ได้สูงสุด 6 คน แต่ละคนได้พื้นที่คลาวด์ OneDrive 1TB พร้อมแอป Office เต็มรูปแบบบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน',
                'specs' => [
                    'Duration' => '1 Year Subscription',
                    'Users' => 'Up to 6 People',
                    'Cloud Storage' => '6 TB (1 TB per person)',
                    'Apps' => 'Word, Excel, PowerPoint, Outlook, OneDrive',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60',
                'is_featured' => false,
            ],

            // SOFTWARE 3: Security
            [
                'category_slug' => 'security-antivirus',
                'name' => 'Kaspersky Plus 2026 (3 Devices / 1 Year)',
                'slug' => 'kaspersky-plus-3-devices-1-year',
                'brand' => 'Kaspersky',
                'type' => 'software',
                'price' => 990.00,
                'stock' => 60,
                'description' => 'ระบบป้องกันไวรัสและภัยคุกคามไซเบอร์แบบเรียลไทม์ พร้อม VPN ความเร็วสูงไม่จำกัด และเครื่องมือเพิ่มความเร็วคอมพิวเตอร์',
                'specs' => [
                    'Devices' => '3 Devices (Windows, macOS, Android, iOS)',
                    'Validity' => '1 Year',
                    'Features' => 'Anti-Malware, Ransomware Protection, Unlimited VPN, Performance Optimization',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
                'is_featured' => false,
            ],

            // SOFTWARE 4: Developer Tools
            [
                'category_slug' => 'developer-tools',
                'name' => 'JetBrains All Products Pack (1 Year Commercial License)',
                'slug' => 'jetbrains-all-products-pack',
                'brand' => 'JetBrains',
                'type' => 'software',
                'price' => 24500.00,
                'stock' => 20,
                'description' => 'ชุดเครื่องมือ IDE ครบวงจรสำหรับโปรแกรมเมอร์และทีมพัฒนาซอฟต์แวร์ รวมถึง PhpStorm, IntelliJ IDEA Ultimate, WebStorm, PyCharm, Rider และ DataGrip',
                'specs' => [
                    'Duration' => '1 Year Subscription with Fallback License',
                    'Included IDEs' => 'PhpStorm, IntelliJ IDEA, WebStorm, PyCharm, CLion, Rider, DataGrip, GoLand',
                    'License' => 'Commercial Organization / Individual',
                    'Updates' => 'All major and minor updates included',
                ],
                'image_url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
                'is_featured' => true,
            ],
        ];

        foreach ($products as $prod) {
            $catSlug = $prod['category_slug'];
            unset($prod['category_slug']);
            $prod['category_id'] = $createdCategories[$catSlug]->id;

            Product::updateOrCreate(
                ['slug' => $prod['slug']],
                $prod
            );
        }
    }
}
