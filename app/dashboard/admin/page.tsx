'use client';

import { Users, Building2, Home as HomeIcon, Wrench, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { StatsCard } from '@/components/ui/stats-card';
import { MOCK_RECORDS, MaintenanceRequest } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
    const { units, maintenanceRequests, residents } = MOCK_RECORDS;

    const totalResidents = residents.length;
    const occupiedUnits = units.filter(u => u.status === 'OCCUPIED').length;
    const vacantUnits = units.filter(u => u.status === 'VACANT').length;
    const pendingRequests = maintenanceRequests.filter(r => r.status === 'PENDING').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Residents"
                    value={totalResidents}
                    icon={Users}
                    trend={{ value: 12, isUp: true }}
                />
                <StatsCard
                    title="Occupied Units"
                    value={occupiedUnits}
                    icon={HomeIcon}
                    trend={{ value: 4, isUp: true }}
                />
                <StatsCard
                    title="Vacant Units"
                    value={vacantUnits}
                    icon={Building2}
                    trend={{ value: 2, isUp: false }}
                />
                <StatsCard
                    title="Pending Requests"
                    value={pendingRequests}
                    icon={Wrench}
                    description="Requires immediate attention"
                    className="bg-indigo-600 !border-indigo-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Maintenance Requests */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Pending Maintenance</h3>
                        <button className="text-indigo-600 text-sm font-medium hover:underline">View all</button>
                    </div>

                    <div className="space-y-4">
                        {maintenanceRequests.slice(0, 3).map((req) => (
                            <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        req.priority === 'HIGH' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                                    )}>
                                        <Wrench className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{req.title}</p>
                                        <p className="text-xs text-gray-500">Unit {req.unit} • {req.residentName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-medium text-gray-900">{req.date}</p>
                                        <p className="text-xs text-gray-500 capitalize">{req.status.replace('_', ' ')}</p>
                                    </div>
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-bold",
                                        req.priority === 'HIGH' ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                                    )}>
                                        {req.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links / Announcements Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-6">Recent Announcements</h3>
                    <div className="space-y-4">
                        {MOCK_RECORDS.announcements.map((ann) => (
                            <div key={ann.id} className="group cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-wider">{ann.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                                        <p className="text-[10px] text-gray-400 mt-2 font-medium">{ann.date}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-50 w-full mt-4" />
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-600 text-sm font-bold transition-all">
                        + Create Announcement
                    </button>
                </div>
            </div>
        </div>
    );
}
