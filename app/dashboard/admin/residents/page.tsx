'use client';

import {
    Users,
    UserPlus,
    Search,
    MoreVertical,
    Mail,
    MapPin,
    Edit2,
    Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_RECORDS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminResidentsPage() {
    const { residents } = MOCK_RECORDS;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Resident Management</h1>
                    <p className="text-gray-500 mt-1">View and manage all registered residents.</p>
                </div>
                <Button className="bg-indigo-600 h-11 px-6 font-bold">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Resident
                </Button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or unit..."
                            className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg h-10 px-4">All Floors</Button>
                        <Button variant="outline" size="sm" className="rounded-lg h-10 px-4">Active Residents</Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Resident</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Unit</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {residents.map((resident) => (
                                <tr key={resident.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                {resident.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 leading-none">{resident.name}</p>
                                                <p className="text-xs text-gray-500 mt-1.5">ID: #{resident.id}204</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                {resident.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-gray-100 rounded-lg">
                                                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{resident.unit}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 3 of 124 residents</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
