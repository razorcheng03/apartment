'use client';

import { Plus, Search, Filter, CheckCircle2, Clock, AlertCircle, Download } from 'lucide-react';
import { MOCK_RECORDS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function AdminPaymentsPage() {
    const { payments } = MOCK_RECORDS;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
                    <p className="text-gray-500 mt-1">Track rent, utilities, and maintenance payments.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Record Payment
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Received', value: '$4,250', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Pending Payments', value: '$1,500', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    { label: 'Overdue Amount', value: '$50', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl", stat.bg)}>
                            <stat.icon className={cn("w-6 h-6", stat.color)} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search payments by resident or ID..." 
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
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Resident</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900">{payment.residentName}</p>
                                        <p className="text-xs text-gray-500">Ref: #{payment.id}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-lg">
                                            {payment.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        ${payment.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {payment.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-full text-xs font-bold",
                                            payment.status === 'PAID' ? "bg-green-100 text-green-700" :
                                            payment.status === 'PENDING' ? "bg-yellow-100 text-yellow-700" :
                                            "bg-red-100 text-red-700"
                                        )}>
                                            {payment.status}
                                        </span>
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
