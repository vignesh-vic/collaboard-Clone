"use client"

import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface newBoardButtonProps {
    orgId?: string
    disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: newBoardButtonProps) => {
    const router = useRouter()
    const { mutate, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        mutate(
            {
                orgId,
                title: "Untitled"

            }
        ).then((id: string) => {
            toast.success("Board created")
            router.push(`/board/${id}`)

        }).catch(() => toast.error("Failed to create board"));
    }
    return (
        <button disabled={pending || disabled} onClick={onClick} className={cn(" cursor-pointer col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-600 flex flex-col items-center justify-center py-6", (pending || disabled) && 'opacity-75 hover:bg-blue-600 cursor-not-allowed')}>

            <div />
            <Plus className="h-12 w-12 text-white storke-1" />
            <p className="text-xs text-white font-light">New board</p>

        </button>
    )

}