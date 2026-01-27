'use client';

import {
    CreditCard,
    ArrowUpRight,
    Download,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_RECORDS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function ResidentPaymentsPage() {
    const { payments } = MOCK_RECORDS;
    // Filter for 'John Doe' as the demo resident
    const myPayments = payments.filter(p => p.residentName === 'John Doe');

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-emerald-50 text-emerald-700';
            case 'PENDING': return 'bg-yellow-50 text-yellow-700';
            case 'OVERDUE': return 'bg-red-50 text-red-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments & Billing</h1>
                    <p className="text-gray-500 mt-1">View your rent invoices and payment history.</p>
                </div>
                <Button className="bg-indigo-600 h-11 px-8 font-bold shadow-lg shadow-indigo-200">
                    Pay Rent Now
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Balance Due</p>
                    <h2 className="text-4xl font-extrabold text-gray-900">$1,500.00</h2>
                    <p className="text-sm text-red-500 font-bold mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        Due in 4 days
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Last Payment</p>
                    <p className="text-xl font-bold text-gray-900">$1,200.00</p>
                    <p className="text-xs text-gray-500 mt-1">Jan 01, 2026</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-5 bg-indigo-50 rounded flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-100">VISA</div>
                        <p className="text-sm font-bold text-gray-900">•••• 4242</p>
                    </div>
                    <button className="text-xs text-indigo-600 font-bold mt-2 hover:underline text-left">Change Method</button>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">Transaction History</h3>
                    <Button variant="ghost" size="sm" className="font-bold">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {myPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="px-8 py-6 font-mono text-xs text-gray-500">#{payment.id}TX-8821</td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-900">{payment.date}</td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-medium text-gray-600">{payment.type}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-extrabold text-gray-900">${payment.amount.toFixed(2)}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
                                            getStatusStyle(payment.status)
                                        )}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                            <Download className="w-4 h-4" />
                                        </button>
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
