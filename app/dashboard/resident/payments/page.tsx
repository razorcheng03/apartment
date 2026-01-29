import prisma from '@/lib/prisma';
import PaymentsClient from './payments-client';

export default async function ResidentPaymentsPage() {
    const RESIDENT_ID = 'res-1'; // Mocking logged in user
    
    const payments = await (prisma as any).payment.findMany({
        where: {
            residentId: RESIDENT_ID
        },
        orderBy: {
            date: 'desc'
        }
    });

    return <PaymentsClient payments={payments} />;
}
