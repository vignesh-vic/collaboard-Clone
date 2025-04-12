"use client"

import { Actions } from "@/components/actions"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRenameModel } from "@/store/use-rename-model"
import { useQuery } from "convex/react"
import { Menu } from "lucide-react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

interface infoPros {
    boardId: string
}

const font = Poppins(
    {
        subsets: [
            "latin"
        ],
        weight: [
            "600"
        ],
    }

)

const TabSeperator = () => {
    return (
        <div
            className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 lg:block"></div>

    )

}

export const Info = ({ boardId }: infoPros) => {

    const { onOpen } = useRenameModel()

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">
    })

    if (!data) {
        return <InfoSkeleton />
    }


    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to boards" side="bottom" sideOffset={10}>
                <Button asChild className="px-2" variant='board'>
                    <Link href='/'>
                        <Image src='/logo.jpg' alt="info" height={40} width={40} />
                        <span className={cn('font-semibold text-xl ml-1 text-black', font.className)}>Board</span>
                    </Link>
                </Button>
            </Hint>
            <TabSeperator />
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button variant='board' className="text-base font-normal px-2 cursor-pointer"
                    onClick={() => onOpen(data._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>
            <Actions
                side="bottom"
                sideOffset={10}
                id={data._id}
                title={data.title}
            >
                <div>
                    <Hint label="Main menu">
                            <Button size='icon' variant='board' >
                                <Menu/>
                            </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    )
}

export const InfoSkeleton = function InfoSkeleton() {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    )
} 