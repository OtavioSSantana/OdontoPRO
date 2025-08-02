"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card'
import { toast } from 'sonner'
import { Subscription } from "@prisma/client"
import { subscriptionPlans } from '@/utils/plans'
import { Button } from '@/components/ui/button';
import { createPortalCustomer } from '../_actions/create-portal-customer'

interface SubscriptionDetailProps{
    subscription: Subscription;
}

export function SubscriptionDetail({subscription} : SubscriptionDetailProps){

    const subscriptionInfo = subscriptionPlans.find(plan => plan.id === subscription.plan)

    async function handleMenageSubscription() {
        const portal = await createPortalCustomer()

        if(portal.error){
            toast.error("Ocorreu um erro ao criar o portal de assinatura")
            return;
        }

        window.location.href = portal.sessionId;
    }

    return(
        <Card className='w-full mx-auto'>
            <CardHeader>
                <CardTitle className='text-2xl'>Seu Plano Atual</CardTitle>
                <CardDescription>
                    Sua assinatura está ativa!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-lg md:text-xl'>
                        {subscription.plan === "BASIC" ? "BASIC" : "PROFISSIONAL"}
                    </h3>

                    <div className='bg-green-500 text-white w-fit px-4 py-1 rounded-md'>
                        {subscription.status === "active" ? "ATIVO" : "INATIVO"}
                    </div>
                </div>

                <ul className='list-disc list-inside space-y-2'>
                    {subscriptionInfo && subscriptionInfo.features.map(feature => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
                
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => handleMenageSubscription()}
                >
                    Gerenciar assinatura
                </Button>
            </CardFooter>
        </Card>
    )
}

