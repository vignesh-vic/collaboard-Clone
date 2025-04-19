"use client"

import { useState } from "react"
import { useHistory, useCanRedo, useCanUndo, useMutation } from "@/liveblocks.config"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { CanvasMode, CanvasState } from "@/types/canvas"
import { CursorPresence } from "./cursors-presence"

interface ConvasProps {
    boardId: string,

}


export const Canvas = ({ boardId }: ConvasProps) => {

    const [CanvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const onPointerMove = useMutation((
        {
        setMyPresence
    }, e: React.PointerEvent) => {

        e.preventDefault()
        const current = { x: 0, y: 0 };
        setMyPresence({cursor:current})
    },[])

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar CanvasState={CanvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}

            />
            <svg className="h-[100vh] w-[100vw]">
                <g>
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )

}