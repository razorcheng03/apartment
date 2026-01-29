import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { getSession } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/login');
    }

    const user = {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role as any,
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <Sidebar role={user.role} />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader user={user as any} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
