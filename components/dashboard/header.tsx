'use client';

import { Bell, Search } from 'lucide-react';
import { User } from '@/lib/mock-data';

interface DashboardHeaderProps {
    user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    return (
        <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="relative w-96 max-w-lg hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for something..."
                    className="w-full bg-gray-50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                <div className="h-8 w-px bg-gray-100 mx-2" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
