"use client"
import { connectionIdToColor } from "@/lib/utils"
import { useOther } from "@/liveblocks.config"
import { MousePointer2 } from "lucide-react"
import { memo } from "react"


interface CursorProps {
    connectionId: number
}

 export const Cursor = memo((
    { connectionId }: CursorProps
) => {
    
    const info = useOther(connectionId, (user: { info: any }) => user?.info)
    const cursor = useOther(connectionId, (user) => user?.presence.cursor)
    const name = info?.name || 'Teammate'
    console.log(info, cursor);
    // const info = otherUser?.info;
    // const cursor = otherUser?.presence?.cursor;
    // const name = info?.name || "Teammate";

    

    if (!cursor) {
        return null
    }

    const { x, y } = cursor
    return (
        <foreignObject
            style={{
                transform: `translateX(${x}px) translateX(${y}px)`
            }}
            height={50}
            width={50}
            className="relative drop-shadow-md"
        >
            <MousePointer2
                className="h-5 w-5"
                style={{
                    fill: connectionIdToColor(connectionId),
                    color: connectionIdToColor(connectionId)
                }}
            />


        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'

