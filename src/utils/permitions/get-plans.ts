"use server"

import { Plan } from "@/types/prisma"
import { PlansProps } from "../plans/index"

export type PlanDetailInfo = {
    maxServices: number;
}

const PLANS_LIMITS: PlansProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL: {
        maxServices: 50
    }
}

export async function getPlan(planId: Plan) {
    return PLANS_LIMITS[planId]
}

