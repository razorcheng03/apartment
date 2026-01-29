'use server'

import prisma from '../prisma'
import { revalidatePath } from 'next/cache'

export async function markAnnouncementAsRead(id: string, userId: string) {
  await prisma.announcementRead.upsert({
    where: {
      announcementId_userId: {
        announcementId: id,
        userId: userId,
      }
    },
    update: {},
    create: {
      announcementId: id,
      userId: userId,
    }
  })

  revalidatePath('/dashboard/resident/announcements')
  revalidatePath('/dashboard/resident')
  return { success: true }
}
