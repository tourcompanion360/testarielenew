'use client';

import { usePathname } from 'next/navigation';
import { SidebarLayout } from '@/components/ui/Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/auth');
    const isLandingPage = false; // We converted landing to dashboard, so only auth pages are excluded

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <SidebarLayout>
            {children}
        </SidebarLayout>
    );
}
