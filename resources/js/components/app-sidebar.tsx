import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    Store,
    ShoppingCart,
    Package,
    Wrench,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { cartCount = 0 } = usePage<{ cartCount?: number }>().props;

    const storeNavItems: NavItem[] = [
        {
            title: 'ร้านค้า (Shop)',
            href: '/shop',
            icon: Store,
        },
        {
            title: 'แจ้งซ่อม (Repair)',
            href: '/repairs',
            icon: Wrench,
        },
        {
            title: 'ตะกร้าสินค้า (Cart)',
            href: '/cart',
            icon: ShoppingCart,
            badge: cartCount > 0 ? cartCount : undefined,
        },
        {
            title: 'คำสั่งซื้อ (Orders)',
            href: '/orders',
            icon: Package,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/shop" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={storeNavItems} label="ร้านค้า TechStore" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
