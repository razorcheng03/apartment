'use client';

import { Megaphone, Plus, Search, Filter, Edit2, Trash2, Calendar, User } from 'lucide-react';
import { MOCK_RECORDS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminAnnouncementsPage() {
    const { announcements } = MOCK_RECORDS;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Announcements</h1>
                    <p className="text-gray-500 mt-1">Broadcast important information to all residents.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Announcement
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search announcements..." 
                            className="pl-10 bg-gray-50/50 border-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Announcement</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {announcements.map((ann) => (
                                <tr key={ann.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{ann.title}</p>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{ann.content}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {ann.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <User className="w-4 h-4 text-gray-400" />
                                            {ann.author}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600">
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {announcements.length === 0 && (
                    <div className="text-center py-20">
                        <Megaphone className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No announcements found</h3>
                        <p className="text-gray-500">Create your first announcement to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
