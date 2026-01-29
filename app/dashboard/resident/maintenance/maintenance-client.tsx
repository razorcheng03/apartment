'use client';

import React, { useState } from 'react';
import {
    Wrench,
    History,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/components/ui/toast';
import { createMaintenanceRequest } from '@/lib/actions/maintenance';
import Link from 'next/link';

interface MaintenanceRequest {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    date: string;
    priority: string;
}

export default function MaintenanceClient({ requests }: { requests: MaintenanceRequest[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
    const { toast } = useToast();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        formData.append('priority', priority);
        
        try {
            const result = await createMaintenanceRequest(formData);
            if (result.success) {
                toast({
                    title: "Request Submitted",
                    description: "Your maintenance request has been recorded successfully.",
                    variant: "success"
                });
                setIsFormOpen(false);
                (e.target as HTMLFormElement).reset();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit request. Please try again.",
                variant: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'IN_PROGRESS': return 'info';
            case 'COMPLETED': return 'success';
            case 'CANCELLED': return 'error';
            default: return 'default';
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
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Issue Title</Label>
                            <Input id="title" name="title" placeholder="Brief summary of the problem" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="category">Issue Category</Label>
                                <select 
                                    id="category" 
                                    name="category"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none bg-gray-50"
                                >
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="HVAC">HVAC / Cooling</option>
                                    <option value="Appliance">Appliance</option>
                                    <option value="Carpentry">Carpentry</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Priority Level</Label>
                                <div className="flex gap-3">
                                    {(['LOW', 'MEDIUM', 'HIGH'] as const).map((p) => (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPriority(p)}
                                            className={cn(
                                                "flex-1 py-3 rounded-xl border-2 font-bold text-xs transition-all",
                                                priority === p ? "border-indigo-600 bg-indigo-50 text-indigo-600" : "border-gray-100 text-gray-400 hover:border-gray-200"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Problem Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                placeholder="Please describe the issue in detail..."
                                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all h-32 bg-gray-50 resize-none"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" type="button" onClick={() => setIsFormOpen(false)} disabled={isSubmitting}>Cancel</Button>
                            <Button className="bg-indigo-600 px-8" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <History className="w-5 h-5 text-gray-400" />
                    Request History
                </h3>
                {requests.map((req) => (
                    <Link key={req.id} href={`/dashboard/resident/maintenance/${req.id}`}>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                                    <Wrench className={cn(
                                        "w-5 h-5",
                                        req.status === 'IN_PROGRESS' ? "text-indigo-500 animate-pulse" : "text-gray-400"
                                    )} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{req.title}</h4>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <Badge variant="secondary" className="text-[10px] tracking-widest">#{req.id.toUpperCase()}</Badge>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="text-xs text-gray-500 font-medium">{req.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="text-xs text-gray-500 font-medium">Requested {req.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                    <Badge variant={getStatusVariant(req.status)}>
                                        {req.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                ))}

                {requests.length === 0 && !isFormOpen && (
                    <EmptyState 
                        title="No active maintenance requests"
                        description="Everything looks good at your home! If you have an issue, click the 'New Request' button above."
                        icon={Wrench}
                    />
                )}
            </div>
        </div>
    );
}
