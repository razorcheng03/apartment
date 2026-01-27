'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { MOCK_ADMIN, MOCK_RESIDENT, User, Role } from '@/lib/mock-data';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // In a real app, this would come from auth context
    // For this demo, we determine role based on the URL path
    const isAdminPath = pathname.includes('/admin');
    const user: User = isAdminPath ? MOCK_ADMIN : MOCK_RESIDENT;

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar role={user.role} />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader user={user} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
