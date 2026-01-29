import prisma from '@/lib/prisma';
import AnnouncementsClient from './announcements-client';

export default async function AnnouncementsPage() {
    const RESIDENT_ID = 'res-1'; // Mocking logged in user
    
    const announcements = await (prisma as any).announcement.findMany({
        include: {
            readBy: {
                where: {
                    userId: RESIDENT_ID
                },
                select: {
                    userId: true
                }
            }
        },
        orderBy: [
            { isPinned: 'desc' },
            { date: 'desc' }
        ]
    });

    return <AnnouncementsClient announcements={announcements} residentId={RESIDENT_ID} />;
}
