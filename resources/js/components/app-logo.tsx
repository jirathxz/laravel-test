import { usePage } from '@inertiajs/react';
import { Cpu } from 'lucide-react';

export default function AppLogo() {
    const { name } = usePage<{ name?: string }>().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-sm">
                <Cpu className="size-4.5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-extrabold text-foreground">
                    {name || 'TechStore'}
                </span>
                <span className="truncate text-[10px] text-muted-foreground leading-none font-medium">
                    Hardware & Software
                </span>
            </div>
        </>
    );
}
