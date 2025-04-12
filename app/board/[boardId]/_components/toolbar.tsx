import { MousePointer2,  Square, StickyNote, Type } from "lucide-react"
import { ToolButton } from "./tool-button"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md  p-1 flex flex-col  gap-y-1  items-center shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => { }}
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => { }}
                />
                <ToolButton
                    label="StickyNote"
                    icon={StickyNote}
                    onClick={() => { }}
                />
                <ToolButton
                    label="Square"
                    icon={Square}
                    onClick={() => { }}
                />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <div>
                    Undo
                </div>
                <div>
                    Redo
                </div>
            </div>
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] shadow-md bg-white h-[360px] w-[52px] left-2 flex flex-col gap-y-4 rounded-md">
        </div>
    )

}