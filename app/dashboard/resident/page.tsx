'use client';

import {
    Home as HomeIcon,
    Wrench,
    CreditCard,
    Megaphone,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { StatsCard } from '@/components/ui/stats-card';
import { MOCK_RECORDS, MOCK_RESIDENT } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ResidentDashboard() {
    const myRequests = MOCK_RECORDS.maintenanceRequests.filter(r => r.residentName === MOCK_RESIDENT.name);
    const myPayments = MOCK_RECORDS.payments.filter(p => p.residentName === 'John Doe'); // Simulating John Doe as current resident for mock data match
    const latestAnnouncement = MOCK_RECORDS.announcements[0];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Howdy, {MOCK_RESIDENT.name.split(' ')[0]}!</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your home in Unit {MOCK_RESIDENT.unit}.</p>
                </div>
                <Button className="shrink-0 bg-indigo-600 hover:bg-indigo-700 h-11 px-6">
                    <Wrench className="w-4 h-4 mr-2" />
                    Request Service
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Rent Status"
                    value="PAID"
                    icon={CreditCard}
                    description="Next due: Feb 1, 2026"
                    className="bg-emerald-50 border-emerald-100"
                />
                <StatsCard
                    title="Active Requests"
                    value={myRequests.length}
                    icon={Wrench}
                    description="1 in progress"
                />
                <StatsCard
                    title="Messages"
                    value="2 New"
                    icon={Megaphone}
                    description="From management"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Unit Status & Actions */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <HomeIcon className="w-5 h-5 text-indigo-500" />
                            Your Residence
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Unit Number</p>
                                <p className="text-lg font-bold text-gray-900">{MOCK_RESIDENT.unit}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <p className="text-lg font-bold text-gray-900">Good Standing</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Plan</p>
                                <p className="text-lg font-bold text-gray-900">Premium 2BHK</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Member Since</p>
                                <p className="text-lg font-bold text-gray-900">March 2023</p>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-50 flex gap-4">
                            <button className="flex-1 py-3 px-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors">
                                Digital Key
                            </button>
                            <button className="flex-1 py-3 px-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-sm hover:bg-gray-100 transition-colors">
                                Visitor Pass
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        <ActivityItem
                            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            title="Rent Payment Received"
                            time="Jan 1, 2026 • 10:30 AM"
                            description="Your rent for January has been processed successfully."
                        />
                        <ActivityItem
                            icon={<Clock className="w-4 h-4 text-indigo-500" />}
                            title="Maintenance Update"
                            time="Jan 25, 2026 • 2:15 PM"
                            description="Technician 'Mike' has been assigned to your request #1024."
                        />
                        <ActivityItem
                            icon={<AlertCircle className="w-4 h-4 text-orange-500" />}
                            title="New Community Rule"
                            time="Yesterday • 4:00 PM"
                            description="Management has updated the pool usage policy."
                        />
                    </div>
                    <button className="w-full mt-8 flex items-center justify-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
                        See All Activity <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ icon, title, time, description }: { icon: React.ReactNode, title: string, time: string, description: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1 shrink-0 p-1.5 bg-gray-50 rounded-lg">{icon}</div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm leading-none">{title}</h4>
                <p className="text-[10px] text-gray-400 font-semibold mt-1 uppercase">{time}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
