import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.announcementRead.deleteMany()
  await prisma.maintenanceRequest.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.unit.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const admin = await prisma.user.create({
    data: {
      id: 'admin-1',
      name: 'Alex Johnson',
      email: 'admin@skyline.com',
      role: 'ADMIN',
    },
  })

  const resident = await prisma.user.create({
    data: {
      id: 'res-1',
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      role: 'RESIDENT',
      unit: 'A-304',
    },
  })

  const john = await prisma.user.create({
    data: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'RESIDENT',
      unit: 'A-101',
    },
  })

  const jane = await prisma.user.create({
    data: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'RESIDENT',
      unit: 'B-205',
    },
  })

  const michael = await prisma.user.create({
    data: {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      role: 'RESIDENT',
      unit: 'C-302',
    },
  })

  // Create Units
  await prisma.unit.createMany({
    data: [
      { number: 'A-101', floor: '1st', type: '2BHK', status: 'OCCUPIED', residentName: 'John Doe' },
      { number: 'A-102', floor: '1st', type: '1BHK', status: 'VACANT' },
      { number: 'B-205', floor: '2nd', type: '3BHK', status: 'OCCUPIED', residentName: 'Jane Smith' },
      { number: 'C-302', floor: '3rd', type: 'Studio', status: 'OCCUPIED', residentName: 'Michael Brown' },
      { number: 'D-104', floor: '1st', type: '2BHK', status: 'MAINTENANCE' },
      { number: 'A-304', floor: '3rd', type: '2BHK', status: 'OCCUPIED', residentName: 'Sarah Connor' },
    ],
  })

  // Create Announcements
  await prisma.announcement.createMany({
    data: [
      { 
        id: '1', 
        title: 'Annual Fire Drill', 
        content: 'Scheduled for next Saturday at 10 AM. Please participate for community safety.', 
        category: 'Urgent',
        date: '2026-01-27', 
        author: 'Management',
        isPinned: true,
      },
      { 
        id: '2', 
        title: 'New Gym Rules', 
        content: 'Gym hours have been extended to 11 PM. Please ensure you wipe down equipment after use.', 
        category: 'General',
        date: '2026-01-24', 
        author: 'Admin',
      },
      { 
        id: '3', 
        title: 'Water Maintenance Notice', 
        content: 'Water supply will be temporarily interrupted on Wednesday from 2 PM to 4 PM for pipe maintenance.', 
        category: 'Maintenance',
        date: '2026-01-28', 
        author: 'Facilities',
      },
    ],
  })

  // Add AnnouncementRead for Sarah
  await prisma.announcementRead.create({
    data: {
      announcementId: '1',
      userId: 'res-1',
    }
  })

  // Create Maintenance Requests
  await prisma.maintenanceRequest.createMany({
    data: [
      { 
        id: '1', 
        residentId: '1', 
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
        residentId: '2', 
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
        residentId: 'res-1', 
        unit: 'A-304', 
        title: 'Light bulb replacement', 
        description: 'The hallway light bulb has burned out and needs replacement.',
        category: 'Electrical',
        status: 'COMPLETED', 
        date: '2026-01-20', 
        priority: 'LOW' 
      },
    ],
  })

  // Create Payments
  await prisma.payment.createMany({
    data: [
      { residentId: '1', amount: 1200, date: '2026-01-01', status: 'PAID', type: 'RENT' },
      { residentId: '2', amount: 1500, date: '2026-01-15', status: 'PENDING', type: 'RENT' },
      { residentId: '3', amount: 50, date: '2026-01-20', status: 'OVERDUE', type: 'MAINTENANCE' },
      { residentId: 'res-1', amount: 1200, date: '2026-01-01', status: 'PAID', type: 'RENT' },
    ],
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
