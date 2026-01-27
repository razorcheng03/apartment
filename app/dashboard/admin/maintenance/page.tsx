'use client';

import {
    Wrench,
    Clock,
    CheckCircle2,
    AlertCircle,
    Filter,
    Search,
    MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_RECORDS, MaintenanceRequest } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminMaintenancePage() {
    const { maintenanceRequests } = MOCK_RECORDS;

    const getStatusStyle = (status: MaintenanceRequest['status']) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'IN_PROGRESS': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        }
    };

    const getPriorityStyle = (priority: MaintenanceRequest['priority']) => {
        switch (priority) {
            case 'HIGH': return 'text-red-600 bg-red-50';
            case 'MEDIUM': return 'text-orange-600 bg-orange-50';
            case 'LOW': return 'text-gray-500 bg-gray-50';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
                    <p className="text-gray-500 mt-1">Track and manage building maintenance tasks.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-11 px-6">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button className="bg-indigo-600 h-11 px-6">
                        Assign Technician
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Urgent</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">2</span>
                        <AlertCircle className="w-8 h-8 text-red-500 opacity-20" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">In Progress</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">5</span>
                        <Clock className="w-8 h-8 text-blue-500 opacity-20" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Resolved Today</p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">12</span>
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-20" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left border-b border-gray-50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Request Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Priority</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Requested By</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {maintenanceRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-6">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{req.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">Requested on {req.date}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight",
                                            getPriorityStyle(req.priority as MaintenanceRequest['priority'])
                                        )}>
                                            {req.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500">
                                                {req.residentName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 leading-none">{req.residentName}</p>
                                                <p className="text-xs text-gray-500 mt-1">Unit {req.unit}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-lg border text-xs font-bold",
                                            getStatusStyle(req.status as MaintenanceRequest['status'])
                                        )}>
                                            {req.status === 'IN_PROGRESS' ? 'In Progress' : req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <Button variant="ghost" size="sm" className="font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                                            Respond
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
