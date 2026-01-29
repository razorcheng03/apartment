'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '../prisma'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Simple authentication logic for the demo
  // In a real app, use bcrypt to compare passwords
  const user = await (prisma as any).user.findUnique({
    where: { email }
  })

  if (!user) {
    return { error: 'Invalid email or password' }
  }

  // Set a session cookie
  const cookieStore = await cookies()
  cookieStore.set('session', JSON.stringify({
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  // Redirect based on role
  if (user.role === 'ADMIN') {
    redirect('/dashboard/admin')
  } else {
    redirect('/dashboard/resident')
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    if (!session) return null
    return JSON.parse(session.value)
  } catch (error) {
    return null
  }
}
