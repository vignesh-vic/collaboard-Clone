"use client"

import { Camera, Color } from "@/types/canvas"
import { useSelf, useMutation } from "@/liveblocks.config"
import { memo } from "react"
import { ColorPicker } from "./color-picker"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { useSelectionBounds } from "@/hooks/use-selection-bounce"
import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"
import { BringToFront, SendToBack, Trash2 } from "lucide-react"

interface SelectionToolsProps {
    camera: Camera,
    setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo((
    { camera, setLastUsedColor }: SelectionToolsProps
) => {
    const selection = useSelf<any>((me) => me.presence.selection)

    const moveToFront = useMutation((
        { storage }
    ) => {
        const liveLayersIds:any = storage.get('layerIds') || []
        const indices: number[] = []
        const arr = liveLayersIds?.toImmutable();

        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = indices.length-1; i >= 0; i--) {
            liveLayersIds.move(indices[i],arr.length-1-(indices.length-1-i))
         
        }

    }, [selection])

    const moveToBack = useMutation((
        { storage }
    ) => {
        const liveLayersIds:any = storage.get('layerIds') || []
        const indices: number[] = []
        const arr = liveLayersIds?.toImmutable();

        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayersIds.move(indices[i],i)
            if (selection.includes(arr[i])) {
                indices.push(i)
            }
        }

    }, [selection])


    const setFill = useMutation((
        { storage },
        fill: Color
    ) => {
        const liveLayers:any = storage.get("layers")
        setLastUsedColor(fill)
        selection.forEach((id: string) => {
            liveLayers.get(id)?.set("fill", fill)
        })
    }, [selection, setLastUsedColor])

    const deleteLayers = useDeleteLayers()

    const selectionBounds = useSelectionBounds()
    if (!selectionBounds) {
        return null

    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y
    return (
        <div
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
            )`
            }}
        >
            <ColorPicker
                onChange={setFill}
            />

            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front">
                    <Button onClick={moveToFront} variant='board' size='icon' >
                        <BringToFront />
                    </Button>

                </Hint>
                <Hint label="Send to back">
                    <Button onClick={moveToBack} variant='board' size='icon' >
                        <SendToBack />
                    </Button>

                </Hint>
            </div>

            <div className="flex pl-2 ml-2 border-l items-center">
                <Hint label="Delete">
                    <Button variant='board' size='icon' onClick={deleteLayers}>
                        <Trash2 />
                    </Button>
                </Hint>
            </div>
        </div>
    )
})


SelectionTools.displayName = 'SelectionTools'