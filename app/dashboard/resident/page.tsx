import {
    Wrench,
    CreditCard,
    Megaphone,
    Clock
} from 'lucide-react';
import { StatsCard } from '@/components/ui/stats-card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Badge } from '@/components/ui/badge';
import prisma from '@/lib/prisma';

export default async function ResidentDashboard() {
    const RESIDENT_ID = 'res-1'; // Mocking logged in user
    
    // Parallel data fetching for speed
    const [user, myRequests, myPayments, latestAnnouncements, allAnnouncements] = await Promise.all([
        (prisma as any).user.findUnique({ where: { id: RESIDENT_ID } }),
        (prisma as any).maintenanceRequest.findMany({ 
            where: { residentId: RESIDENT_ID },
            orderBy: { createdAt: 'desc' },
            take: 3
        }),
        (prisma as any).payment.findMany({ 
            where: { residentId: RESIDENT_ID },
            orderBy: { date: 'desc' }
        }),
        (prisma as any).announcement.findMany({ 
            orderBy: [{ isPinned: 'desc' }, { date: 'desc' }],
            take: 2
        }),
        (prisma as any).announcement.findMany()
    ]);

    if (!user) return <div>User not found</div>;

    const rentPayment = myPayments.find((p: any) => p.type === 'RENT');
    const rentStatus = rentPayment?.status || 'PENDING';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Howdy, {user.name.split(' ')[0]}! 👋</h1>
                    <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your home in Unit {user.unit}.</p>
                </div>
                <Link href="/dashboard/resident/maintenance">
                    <Button className="shrink-0 bg-indigo-600 hover:bg-indigo-700 h-11 px-6">
                        <Wrench className="w-4 h-4 mr-2" />
                        Request Service
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Rent Status"
                    value={rentStatus}
                    icon={CreditCard}
                    description={rentStatus === 'PAID' ? "Paid for this month" : "Next due: Feb 1, 2026"}
                    className={cn(
                        rentStatus === 'PAID' ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
                    )}
                />
                <StatsCard
                    title="Active Requests"
                    value={myRequests.filter((r: any) => r.status !== 'COMPLETED' && r.status !== 'CANCELLED').length}
                    icon={Wrench}
                    description={`${myRequests.filter((r: any) => r.status === 'IN_PROGRESS').length} in progress`}
                />
                <StatsCard
                    title="New Announcements"
                    value={allAnnouncements.length}
                    icon={Megaphone}
                    description="Check for latest updates"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-indigo-500" />
                            Recent Activity
                        </h3>
                    </div>
                    <div className="space-y-6">
                        {myRequests.length === 0 && myPayments.length === 0 && (
                            <p className="text-sm text-gray-500 text-center py-10">No recent activity found.</p>
                        )}
                        {myRequests.map((req: any) => (
                            <ActivityItem
                                key={req.id}
                                icon={<Wrench className={cn("w-4 h-4", req.status === 'COMPLETED' ? "text-emerald-500" : "text-indigo-500")} />}
                                title={`Maintenance: ${req.title}`}
                                time={`${req.date}`}
                                description={req.description}
                                status={req.status}
                            />
                        ))}
                        {myPayments.slice(0, 1).map((pay: any) => (
                            <ActivityItem
                                key={pay.id}
                                icon={<CreditCard className="w-4 h-4 text-emerald-500" />}
                                title={`${pay.type} Payment ${pay.status}`}
                                time={pay.date}
                                description={`A payment of $${pay.amount} was recorded for ${pay.type.toLowerCase()}.`}
                                status={pay.status}
                            />
                        ))}
                    </div>
                </div>

                {/* Latest Announcements */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-amber-500" />
                        Community News
                    </h3>
                    <div className="space-y-6">
                        {latestAnnouncements.map((ann: any) => (
                            <div key={ann.id} className="group cursor-pointer">
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "mt-1 w-2 h-2 rounded-full shrink-0",
                                        ann.category === 'Urgent' ? "bg-red-500" : "bg-indigo-500"
                                    )} />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-wider">{ann.title}</h4>
                                            {ann.isPinned && <Badge variant="info" className="text-[8px] px-1 py-0 h-3">PINNED</Badge>}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{ann.content}</p>
                                        <p className="text-[10px] text-gray-400 mt-2 font-medium">{ann.date}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-50 w-full mt-4" />
                            </div>
                        ))}
                    </div>
                    <Link href="/dashboard/resident/announcements">
                        <Button variant="ghost" className="w-full mt-6 text-indigo-600 font-bold text-sm">
                            View All Announcements
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ icon, title, time, description, status }: { icon: React.ReactNode, title: string, time: string, description: string, status?: string }) {
    return (
        <div className="flex gap-4 group cursor-pointer hover:bg-gray-50/50 p-2 rounded-2xl transition-all">
            <div className="mt-1 shrink-0 p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">{icon}</div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-sm leading-none">{title}</h4>
                    {status && (
                        <Badge variant={status === 'COMPLETED' || status === 'PAID' ? 'success' : 'warning'} className="text-[10px]">
                            {status}
                        </Badge>
                    )}
                </div>
                <p className="text-[10px] text-gray-400 font-semibold mt-1 uppercase">{time}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-1">{description}</p>
            </div>
        </div>
    );
}
