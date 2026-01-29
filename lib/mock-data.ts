export type Role = 'ADMIN' | 'RESIDENT';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    unit?: string;
}

export interface MaintenanceRequest {
    id: string;
    residentName: string;
    unit: string;
    title: string;
    description: string;
    category: 'Plumbing' | 'Electrical' | 'HVAC' | 'Appliance' | 'Carpentry' | 'Other';
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    date: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Unit {
    id: string;
    number: string;
    floor: string;
    type: string;
    status: 'OCCUPIED' | 'VACANT' | 'MAINTENANCE';
    residentName?: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    category: 'General' | 'Urgent' | 'Event' | 'Maintenance';
    date: string;
    author: string;
    isPinned?: boolean;
    readBy?: string[]; // Array of user IDs
}

export interface Payment {
    id: string;
    residentName: string;
    amount: number;
    date: string;
    status: 'PAID' | 'PENDING' | 'OVERDUE';
    type: 'RENT' | 'UTILITIES' | 'MAINTENANCE';
}

export const MOCK_ADMIN: User = {
    id: 'admin-1',
    name: 'Alex Johnson',
    email: 'admin@skyline.com',
    role: 'ADMIN',
};

export const MOCK_RESIDENT: User = {
    id: 'res-1',
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    role: 'RESIDENT',
    unit: 'A-304',
};

export const MOCK_RECORDS = {
    residents: [
        { id: '1', name: 'John Doe', email: 'john@example.com', unit: 'A-101', role: 'RESIDENT' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', unit: 'B-205', role: 'RESIDENT' },
        { id: '3', name: 'Michael Brown', email: 'michael@example.com', unit: 'C-302', role: 'RESIDENT' },
    ],
    units: [
        { id: '1', number: 'A-101', floor: '1st', type: '2BHK', status: 'OCCUPIED', residentName: 'John Doe' },
        { id: '2', number: 'A-102', floor: '1st', type: '1BHK', status: 'VACANT' },
        { id: '3', number: 'B-205', floor: '2nd', type: '3BHK', status: 'OCCUPIED', residentName: 'Jane Smith' },
        { id: '4', number: 'C-302', floor: '3rd', type: 'Studio', status: 'OCCUPIED', residentName: 'Michael Brown' },
        { id: '5', number: 'D-104', floor: '1st', type: '2BHK', status: 'MAINTENANCE' },
    ],
    maintenanceRequests: [
        { 
            id: '1', 
            residentName: 'John Doe', 
            unit: 'A-101', 
            title: 'Leaky Faucet', 
            description: 'The kitchen faucet is leaking constantly, causing water waste.',
            category: 'Plumbing',
            status: 'PENDING', 
            date: '2026-01-25', 
            priority: 'MEDIUM' 
        },
        { 
            id: '2', 
            residentName: 'Jane Smith', 
            unit: 'B-205', 
            title: 'Broken AC', 
            description: 'The air conditioning unit in the master bedroom stopped blowing cold air.',
            category: 'HVAC',
            status: 'IN_PROGRESS', 
            date: '2026-01-26', 
            priority: 'HIGH' 
        },
        { 
            id: '3', 
            residentName: 'Sarah Connor', 
            unit: 'A-304', 
            title: 'Light bulb replacement', 
            description: 'The hallway light bulb has burned out and needs replacement.',
            category: 'Electrical',
            status: 'COMPLETED', 
            date: '2026-01-20', 
            priority: 'LOW' 
        },
    ],
    announcements: [
        { 
            id: '1', 
            title: 'Annual Fire Drill', 
            content: 'Scheduled for next Saturday at 10 AM. Please participate for community safety.', 
            category: 'Urgent',
            date: '2026-01-27', 
            author: 'Management',
            isPinned: true,
            readBy: ['res-1']
        },
        { 
            id: '2', 
            title: 'New Gym Rules', 
            content: 'Gym hours have been extended to 11 PM. Please ensure you wipe down equipment after use.', 
            category: 'General',
            date: '2026-01-24', 
            author: 'Admin',
            readBy: []
        },
        { 
            id: '3', 
            title: 'Water Maintenance Notice', 
            content: 'Water supply will be temporarily interrupted on Wednesday from 2 PM to 4 PM for pipe maintenance.', 
            category: 'Maintenance',
            date: '2026-01-28', 
            author: 'Facilities',
            readBy: []
        },
    ],
    payments: [
        { id: '1', residentName: 'John Doe', amount: 1200, date: '2026-01-01', status: 'PAID', type: 'RENT' },
        { id: '2', residentName: 'Jane Smith', amount: 1500, date: '2026-01-15', status: 'PENDING', type: 'RENT' },
        { id: '3', residentName: 'Michael Brown', amount: 50, date: '2026-01-20', status: 'OVERDUE', type: 'MAINTENANCE' },
    ]
};
