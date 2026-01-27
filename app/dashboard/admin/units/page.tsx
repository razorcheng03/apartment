'use client';

import {
    Building2,
    Plus,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    Wrench
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_RECORDS, Unit } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminUnitsPage() {
    const { units } = MOCK_RECORDS;

    const getStatusStyle = (status: Unit['status']) => {
        switch (status) {
            case 'OCCUPIED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'VACANT': return 'bg-gray-50 text-gray-700 border-gray-100';
            case 'MAINTENANCE': return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Apartments & Units</h1>
                    <p className="text-gray-500 mt-1">Manage building capacity and unit status.</p>
                </div>
                <Button className="bg-indigo-600 h-11 px-6 font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Unit
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.map((unit) => (
                    <div key={unit.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Unit {unit.number}</h3>
                                    <p className="text-xs text-gray-500 font-medium">{unit.type} • Floor {unit.floor}</p>
                                </div>
                            </div>
                            <span className={cn(
                                "px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider",
                                getStatusStyle(unit.status as Unit['status'])
                            )}>
                                {unit.status}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm py-3 border-t border-gray-50">
                                <span className="text-gray-400 font-medium">Resident</span>
                                <span className="text-gray-900 font-bold">{unit.residentName || 'N/A'}</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 text-xs font-bold h-9">View Specs</Button>
                                {unit.status === 'VACANT' ? (
                                    <Button className="flex-1 text-xs font-bold h-9 bg-indigo-600">Assign</Button>
                                ) : (
                                    <Button variant="ghost" className="flex-1 text-xs font-bold h-9 text-indigo-600 hover:bg-indigo-50">History</Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <button className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all min-h-[220px]">
                    <div className="p-3 bg-gray-50 rounded-full group-hover:bg-indigo-100">
                        <Plus className="w-6 h-6" />
                    </div>
                    <p className="font-bold">Add New Unit</p>
                </button>
            </div>
        </div>
    );
}
