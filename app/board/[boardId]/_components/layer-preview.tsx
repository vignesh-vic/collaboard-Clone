"use client"

import { colorToCss } from "@/lib/utils"
import { useStorage } from "@/liveblocks.config"
import { LayerType } from "@/types/canvas"
import { memo } from "react"
import { Text } from "./text"
import { Ellispe } from "./ellipse"
import { Rectangle } from "./rectangle"
import { Note } from "./note"
import { Path } from "./path"


interface LayerPreviewProps {
    id: string,
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColor?: string
}

export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer:any = useStorage((root:any) => root.layers.get(id))

    if (!layer) {
        return null;
    }


    switch (layer.type) {
        case LayerType.Path:
            return (
                <Path
                    key={id}
                    points={layer.points}
                    onPointerDown={(e)=>onLayerPointerDown(e,id)}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? colorToCss(layer.fill):"#000"}
                    stroke={selectionColor}

                />
            )
        case LayerType.Note:
            return (
                <Note
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return (
                <Text
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            )

        case LayerType.Ellipse:
            return (
                <Ellispe
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />

            );
        case LayerType.Rectangle:
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />

            );
        default:
            console.warn("Unknown");
            return null
    }

    // return (
    //     <div>

    //     </div>
    // )
})



LayerPreview.displayName = 'Layer'