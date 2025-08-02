// Tipos centralizados do Prisma
export * from '@prisma/client'

// Tipos com includes comuns - usando sintaxe mais simples
import type { Prisma } from '@prisma/client'

// Tipo para Plan
export type Plan = 'BASIC' | 'PROFESSIONAL'

// Tipo para Subscription
export type Subscription = {
  id: string
  status: string
  plan: 'BASIC' | 'PROFESSIONAL'
  priceID: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

// Tipo para Reminder
export type Reminder = {
  id: string
  description: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

// Tipo para Appointment com Service
export type AppointmentWithService = {
  id: string
  name: string
  email: string
  phone: string
  appointmentDate: Date
  time: string
  createdAt: Date
  updatedAt: Date
  serviceId: string
  userId: string
  service: {
    id: string
    name: string
    price: number
    duration: number
    status: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
  }
}

// Tipo para User com Subscription
export type UserWithSubscription = {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  address: string | null
  phone: string | null
  status: boolean
  timeZone: string | null
  stripe_customer_id: string | null
  times: string[]
  createdAt: Date
  updatedAt: Date
  subscription: {
    id: string
    status: string
    plan: 'BASIC' | 'PROFESSIONAL'
    priceID: string
    createdAt: Date
    updatedAt: Date
    userId: string
  } | null
}

// Tipo para User com Services e Subscription
export type UserWithServiceAndSubscription = {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  address: string | null
  phone: string | null
  status: boolean
  timeZone: string | null
  stripe_customer_id: string | null
  times: string[]
  createdAt: Date
  updatedAt: Date
  services: {
    id: string
    name: string
    price: number
    duration: number
    status: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
  }[]
  subscription: {
    id: string
    status: string
    plan: 'BASIC' | 'PROFESSIONAL'
    priceID: string
    createdAt: Date
    updatedAt: Date
    userId: string
  } | null
} 