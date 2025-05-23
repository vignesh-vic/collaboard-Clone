"use client"

import Image from "next/image"
import { useOrganization,useOrganizationList } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { Hint } from "@/components/hint"





interface ItemsProS{
    id:string,
    name: string,
    imageUrl: string,
}

export const  Item = ({
    id,
    name,
    imageUrl
}: ItemsProS) => {
    const { organization } = useOrganization()
    const { setActive } = useOrganizationList()

    
    const isActive = organization?.id == id


    const onClick = ()=>{
        if (!setActive) {
            return
        }
        setActive({ organization: id })
    }


    return (
        <div  className="aspect-square relative">
            <Hint label={name}
            side="right"
            algin="start"
            sideOffset={8}
            >

            <Image src={imageUrl} alt={name} onClick={onClick} width={30} height={30} className={cn(`rounded-md cursor-pointer opacity-75 hover:opacity-100 transition ${isActive ? "bg-amber-800":""}`, isActive && 'opacity-100 ' )}/>
            </Hint>
    
        </div>
    )
}