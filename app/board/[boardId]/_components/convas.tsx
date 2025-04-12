"use client"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

interface ConvasProps {
    boardId: string,

}


export const Canvas = ({ boardId }: ConvasProps) => {

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar />
        </main>
    )

}