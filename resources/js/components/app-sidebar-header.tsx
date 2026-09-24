import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { cartCount = 0 } = usePage<{ cartCount?: number }>().props;

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-2">
                <Link
                    href="/cart"
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sidebar-border/80 bg-sidebar-accent/50 hover:bg-sidebar-accent text-sidebar-foreground text-xs font-semibold transition-colors"
                >
                    <ShoppingCart className="size-4 text-cyan-500" />
                    <span>ตะกร้า</span>
                    {cartCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 rounded-full bg-cyan-500 text-neutral-950 font-bold text-[10px]">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}
