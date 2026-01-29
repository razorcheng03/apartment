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
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';

interface Payment {
    id: string;
    amount: number;
    date: string;
    status: string;
    type: string;
}

export default function PaymentsClient({ payments }: { payments: Payment[] }) {
    const { toast } = useToast();
    const rentPayment = payments.find(p => p.type === 'RENT');
    const rentStatus = rentPayment?.status || 'PENDING';
    const rentAmount = rentPayment?.amount || 1500;

    const lastPayment = payments[0];

    const handleDownload = (id: string) => {
        toast({
            title: "Downloading Receipt",
            description: `Receipt for transaction #${id} is being generated.`,
            variant: "info"
        });
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'PAID': return 'success';
            case 'PENDING': return 'warning';
            case 'OVERDUE': return 'error';
            default: return 'secondary';
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
                <div className={cn(
                    "p-8 rounded-3xl border shadow-sm transition-all",
                    rentStatus === 'PAID' ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100 shadow-red-50"
                )}>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Rent Status</p>
                        <Badge variant={getStatusVariant(rentStatus)}>{rentStatus}</Badge>
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900">${rentAmount.toLocaleString()}.00</h2>
                    <p className={cn(
                        "text-sm font-bold mt-2 flex items-center gap-1",
                        rentStatus === 'PAID' ? "text-emerald-600" : "text-red-500"
                    )}>
                        {rentStatus === 'PAID' ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Paid for January
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-4 h-4" />
                                Due in 4 days
                            </>
                        )}
                    </p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Last Payment</p>
                    <p className="text-xl font-bold text-gray-900">${lastPayment?.amount.toLocaleString() || '0'}.00</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-tighter">{lastPayment?.date || 'N/A'}</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Quick Actions</p>
                    <div className="space-y-2 mt-2">
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                            <Filter className="w-3 h-3 mr-2" />
                            Filter by Date
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start text-xs font-bold">
                            <ArrowUpRight className="w-3 h-3 mr-2" />
                            Setup Autopay
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">Transaction History</h3>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="font-bold text-indigo-600 hover:bg-indigo-50"
                        onClick={() => handleDownload('ALL')}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export history
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/30">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-50/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="font-mono text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-md tracking-tighter">#{payment.id.toUpperCase()}-TXN</span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-900">{payment.date}</td>
                                    <td className="px-8 py-6">
                                        <Badge variant="secondary" className="text-[10px] font-black uppercase">{payment.type}</Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-extrabold text-gray-900 tracking-tight">${payment.amount.toFixed(2)}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge variant={getStatusVariant(payment.status)}>
                                            {payment.status}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button 
                                            onClick={() => handleDownload(payment.id)}
                                            className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                        >
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
