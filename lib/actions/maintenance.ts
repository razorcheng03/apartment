'use server'

import prisma from '../prisma'
import { revalidatePath } from 'next/cache'

export async function createMaintenanceRequest(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const priority = formData.get('priority') as string

  const newRequest = await prisma.maintenanceRequest.create({
    data: {
      residentId: 'res-1', // Mocking current user
      unit: 'A-304',
      title,
      description,
      category,
      status: 'PENDING',
      date: new Date().toISOString().split('T')[0],
      priority,
    }
  })
  
  revalidatePath('/dashboard/resident/maintenance')
  return { success: true, request: newRequest }
}

export async function cancelMaintenanceRequest(id: string) {
  await prisma.maintenanceRequest.update({
    where: { id },
    data: { status: 'CANCELLED' }
  })

  revalidatePath('/dashboard/resident/maintenance')
  return { success: true }
}
