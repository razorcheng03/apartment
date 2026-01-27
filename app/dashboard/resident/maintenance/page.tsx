'use client';

import React, { useState } from 'react';
import {
    Wrench,
    Plus,
    History,
    AlertCircle,
    Clock,
    CheckCircle2,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_RECORDS, MaintenanceRequest } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function ResidentMaintenancePage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const myRequests = MOCK_RECORDS.maintenanceRequests.filter(r => r.residentName === 'Sarah Connor');

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock className="w-5 h-5 text-amber-500" />;
            case 'IN_PROGRESS': return <Wrench className="w-5 h-5 text-indigo-500 animate-pulse" />;
            case 'COMPLETED': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Maintenance & Services</h1>
                    <p className="text-gray-500 mt-1">Request repairs and track service status.</p>
                </div>
                <Button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="bg-indigo-600 h-12 px-8 font-bold rounded-2xl shadow-lg shadow-indigo-100"
                >
                    {isFormOpen ? 'Close Form' : 'New Request'}
                </Button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-xl shadow-indigo-50/50 animate-in zoom-in-95 duration-300">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Service Request</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Issue Category</Label>
                                <select className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none bg-gray-50">
                                    <option>Plumbing</option>
                                    <option>Electrical</option>
                                    <option>HVAC / Cooling</option>
                                    <option>Appliance</option>
                                    <option>Carpentry</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Priority Level</Label>
                                <div className="flex gap-3">
                                    {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            className={cn(
                                                "flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all",
                                                p === 'MEDIUM' ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-100 text-gray-400 hover:border-gray-200"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Problem Description</Label>
                            <textarea
                                placeholder="Please describe the issue in detail..."
                                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all h-32 bg-gray-50 resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" type="button" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button className="bg-indigo-600 px-8">Submit Request</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-400" />
                    Request History
                </h3>
                {myRequests.map((req) => (
                    <div key={req.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-6">
                            <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                                {getStatusIcon(req.status)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{req.title}</h4>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">#{req.id}2026</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="text-xs text-gray-500 font-medium">Requested {req.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                <p className={cn(
                                    "text-sm font-bold",
                                    req.status === 'COMPLETED' ? "text-emerald-500" : "text-amber-500"
                                )}>{req.status.replace('_', ' ')}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" />
                        </div>
                    </div>
                ))}

                {myRequests.length === 0 && !isFormOpen && (
                    <div className="py-20 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Wrench className="w-8 h-8 text-gray-300" />
                        </div>
                        <h4 className="font-bold text-gray-400">No active maintenance requests</h4>
                        <p className="text-sm text-gray-400 mt-1">Everything looks good at your home!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
