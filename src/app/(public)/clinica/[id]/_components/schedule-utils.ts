

export function isToday(date: Date){
    const now = new Date();

    return(
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    )
}

export function isSlotInThePast(sLotTime: string){
    const [slotHour, slotMinute] = sLotTime.split(":").map(Number)

    const now = new Date()
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if(slotHour < currentHour){
        return true;
    } else if (slotHour === currentHour && slotMinute <= currentMinute){
        return true;
    }

    return false;
}

export function isSlotSequenceAvailable(
    startSlot: string,
    requiredSlots:number,
    allSlots: string[],
    blockedSlots: string[]
){
    const startIndex = allSlots.indexOf(startSlot)
    if(startIndex === -1 || startIndex + requiredSlots > allSlots.length){
        return false;
    }

    for(let i = startIndex; i < startIndex + requiredSlots; i++){
        const sLotTime = allSlots[i]

        if(blockedSlots.includes(sLotTime)){
            return false;
        }
    }

    return true;
}