"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm} from 'react-hook-form'
import { z } from 'zod'

interface UseProfileProps{
    name: string | null;
    email: string | null;
    phone: string | null;
    date: boolean | null;
    serviceId: string | null;
}

export const appointmentSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório "),
    email: z.string().email("O email é obrigatório"),
    phone: z.string().min(1, "o telefone é obrigatório"),
    date: z.date(),
    serviceId: z.string().min(1, "O serviço é obrigatório"),
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export function useAppointmentForm(){
    return useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues:{
            name: "",
            email: "",
            phone: "",
            date: new Date(),
            serviceId: ""
        }
    })
}