'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Building2,
    Wrench,
    Megaphone,
    CreditCard,
    UserCircle,
    LogOut,
    ChevronRight,
    Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Role } from '@/lib/mock-data';

import { logout } from '@/lib/actions/auth';

interface SidebarProps {
    role: Role;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const handleLogout = async () => {
        await logout();
    };

    const adminLinks = [
        { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Residents', href: '/dashboard/admin/residents', icon: Users },
        { name: 'Apartments', href: '/dashboard/admin/units', icon: Building2 },
        { name: 'Maintenance', href: '/dashboard/admin/maintenance', icon: Wrench },
        { name: 'Announcements', href: '/dashboard/admin/announcements', icon: Megaphone },
        { name: 'Payments', href: '/dashboard/admin/payments', icon: CreditCard },
    ];

    const residentLinks = [
        { name: 'My Home', href: '/dashboard/resident', icon: Home },
        { name: 'Maintenance', href: '/dashboard/resident/maintenance', icon: Wrench },
        { name: 'Announcements', href: '/dashboard/resident/announcements', icon: Megaphone },
        { name: 'Payment History', href: '/dashboard/resident/payments', icon: CreditCard },
        { name: 'Profile', href: '/dashboard/resident/profile', icon: UserCircle },
    ];

    const links = role === 'ADMIN' ? adminLinks : residentLinks;

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Skyline</span>
                </div>

                <nav className="space-y-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon className={cn(
                                        "w-5 h-5 transition-colors",
                                        isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"
                                    )} />
                                    {link.name}
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-100">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
