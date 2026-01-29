import prisma from '@/lib/prisma';
import MaintenanceDetailClient from './maintenance-detail-client';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function MaintenanceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const request = await (prisma as any).maintenanceRequest.findUnique({
        where: { id }
    });

    if (!request) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <XCircle className="w-16 h-16 text-gray-200 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Request Not Found</h2>
                <p className="text-gray-500 mt-2">The maintenance request you are looking for does not exist.</p>
                <Link href="/dashboard/resident/maintenance" className="mt-8">
                    <Button variant="outline">Back to History</Button>
                </Link>
            </div>
        );
    }

    return <MaintenanceDetailClient request={request} />;
}
