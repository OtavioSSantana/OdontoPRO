import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { Plan } from "@prisma/client";


export async function manageSubscription(
    subscriptionId: string,
    customerId: string,
    createdAction = false,
    deleteAction = false,
    type?: Plan
){

    const findUser = await prisma.user.findFirst({
        where:{
            stripe_customer_id: customerId
        }
    })

    if(!findUser){
        return Response.json({ error: "Falha ao realizar assinatura"}, {status:400})
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: findUser.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        plan: type ?? "BASIC"
    }

    if(subscriptionId && deleteAction){
        await prisma.subscription.delete({
            where: {
                id: subscriptionId
            }
        })
        
        return;
    }

    if(createdAction){
        try{
            await prisma.subscription.create({
                data: {
                    id: subscriptionData.id,
                    userId: subscriptionData.userId,
                    plan: subscriptionData.plan,
                    priceID: subscriptionData.priceId,
                    status: subscriptionData.status
                }
            })

        }catch(err){
            console.log("ERRO AO SALVAR NO BANCO A ASSINARUTA");
            console.log(err);

        }
    }else{
        try{
            const findSubscription = await prisma.subscription.findFirst({
                where:{
                    id: subscriptionId,
                }
            })

            if(!findSubscription) return;

            await prisma.subscription.update({
                where:{
                    id: findSubscription.id
                },
                data:{
                    status: subscription.status,
                    priceID: subscription.items.data[0].price.id,
                }
            })

        }catch(err){
            console.log("FALHA AO ATUALIZAR ASSINATURA NO BANCO");
            console.log(err);

        }
    }

}

