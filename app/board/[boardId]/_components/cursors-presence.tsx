"use client"

import { shallow } from "@liveblocks/client"
import { Cursor } from "./cursor"
import { useOthersConnectionIds } from "@/liveblocks.config"
import { memo } from "react"
import { colorToCss } from "@/lib/utils"
import { useOthersMapped } from "@/liveblocks.config"
import { Path } from "./path"


const Cursors = () => {
    const ids = useOthersConnectionIds()

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}

const Drafts = () => {
    const others = useOthersMapped((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow)

    return (
        <>
            {
                others.map(([keys, other]: any) => {
                    if (other.pencilDraft) {
                        return <Path
                            key={keys}
                            x={0}
                            y={0}
                            points={other.pencilDraft}
                            fill={other.penColor ? colorToCss(other.penColor) : "#000"}
                        />
                    }

                    return null
                })
            }
        </>
    )
}

export const CursorPresence = memo(() => {

    return (
        <>
            <Drafts />
            <Cursors />
        </>
    )
})

CursorPresence.displayName = 'CursorPresence'