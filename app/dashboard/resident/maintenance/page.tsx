import prisma from '@/lib/prisma';
import MaintenanceClient from './maintenance-client';

export default async function ResidentMaintenancePage() {
    const RESIDENT_ID = 'res-1'; // Mocking logged in user
    
    const requests = await (prisma as any).maintenanceRequest.findMany({
        where: {
            residentId: RESIDENT_ID
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return <MaintenanceClient requests={requests} />;
}
