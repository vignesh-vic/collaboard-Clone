"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { Item } from "./items";

export const List = () => {

    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    if(!userMemberships.data?.length) return null;


    return (
        <ul className="space-y-4 p-2">
            {userMemberships.data.map((member)=>(
                <Item key={member.organization.id}  id={member.organization.id} name={member.organization.name} imageUrl={member.organization.imageUrl} />


            ))}

        </ul>
    )
}