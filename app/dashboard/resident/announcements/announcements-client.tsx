'use client';

import { Megaphone, Calendar, User, Pin, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { markAnnouncementAsRead } from '@/lib/actions/announcements';
import { useToast } from '@/components/ui/toast';
import { useState } from 'react';

interface AnnouncementWithRead {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    author: string;
    isPinned: boolean;
    readBy: { userId: string }[];
}

export default function AnnouncementsClient({ 
    announcements, 
    residentId 
}: { 
    announcements: AnnouncementWithRead[], 
    residentId: string 
}) {
    const { toast } = useToast();
    const [filter, setFilter] = useState<string>('All');
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const categories = ['All', 'General', 'Urgent', 'Event', 'Maintenance'];

    const filteredAnnouncements = announcements
        .filter(ann => filter === 'All' || ann.category === filter)
        .sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));

    const handleMarkAsRead = async (id: string) => {
        setIsUpdating(id);
        try {
            const result = await markAnnouncementAsRead(id, residentId);
            if (result.success) {
                toast({
                    title: "Marked as Read",
                    description: "Announcement status updated.",
                    variant: "success"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update status.",
                variant: "error"
            });
        } finally {
            setIsUpdating(null);
        }
    };

    const getCategoryVariant = (category: string) => {
        switch (category) {
            case 'Urgent': return 'error';
            case 'Maintenance': return 'warning';
            case 'Event': return 'info';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Community Updates</h1>
                    <p className="text-gray-500 mt-1">Stay informed about what&apos;s happening in Skyline Residencies.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                                filter === cat 
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-6">
                {filteredAnnouncements.map((ann) => {
                    const isRead = ann.readBy.some(read => read.userId === residentId);
                    return (
                        <div 
                            key={ann.id} 
                            className={cn(
                                "bg-white p-8 rounded-3xl shadow-sm border transition-all relative overflow-hidden group",
                                ann.isPinned ? "border-indigo-100 bg-indigo-50/10" : "border-gray-100",
                                !isRead && !ann.isPinned && "border-l-4 border-l-indigo-500"
                            )}
                        >
                            {ann.isPinned && (
                                <div className="absolute top-0 right-0 p-3">
                                    <Pin className="w-4 h-4 text-indigo-400 rotate-45" />
                                </div>
                            )}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className={cn(
                                    "hidden md:flex shrink-0 w-16 h-16 rounded-2xl items-center justify-center",
                                    ann.category === 'Urgent' ? "bg-red-50 text-red-500" : "bg-indigo-50 text-indigo-500"
                                )}>
                                    <Megaphone className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge variant={getCategoryVariant(ann.category)}>{ann.category}</Badge>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{ann.title}</h3>
                                            {!isRead && <Badge variant="info">NEW</Badge>}
                                        </div>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {ann.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="w-3 h-3" />
                                                {ann.author}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-6">
                                        {ann.content}
                                    </p>
                                    <div className="flex justify-end">
                                        {!isRead && (
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="text-indigo-600 font-bold hover:bg-indigo-50"
                                                onClick={() => handleMarkAsRead(ann.id)}
                                                disabled={isUpdating === ann.id}
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                {isUpdating === ann.id ? "Updating..." : "Mark as Read"}
                                            </Button>
                                        )}
                                        {isRead && (
                                            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                Seen
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {filteredAnnouncements.length === 0 && (
                    <div className="text-center py-32 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <Megaphone className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">No announcements found</h3>
                        <p className="text-sm text-gray-400 mt-2">Try selecting a different category filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
