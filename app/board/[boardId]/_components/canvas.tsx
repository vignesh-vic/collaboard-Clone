"use client"
import { nanoid } from 'nanoid'
import { useCallback, useEffect, useMemo, useState } from "react"
import { LiveObject } from '@liveblocks/client'
import { useHistory, useCanRedo, useCanUndo, useMutation, useOthersMapped, useSelf } from "@/liveblocks.config"
import { colorToCss, connectionIdToColor, findIntersectingLayersWithRectangle, penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils"
import { useDisableScrollBounce } from '@/hooks/use-disable-scroll-bounce'
import { useDeleteLayers } from '@/hooks/use-delete-layers'

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import {
    Camera,
    CanvasMode,
    CanvasState,
    Color,
    LayerType,
    Point,
    Side,
    XYWH
} from "@/types/canvas"
import { Path } from './path'
import { CursorPresence } from "./cursors-presence"
import { useStorage } from "@/liveblocks.config"
import { LayerPreview } from './layer-preview'
import { SelectionBox } from './selection-box'
import { SelectionTools } from './selection-tool'

const MAX_LAYERS = 100;

interface ConvasProps {
    boardId: string,

}


export const Canvas = ({ boardId }: ConvasProps) => {
    const layerIds:any = useStorage((root) => root.layerIds)
    const pencilDraft:any = useSelf((me) => me.presence.pencilDraft)
    const [CanvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0
    })


    useDisableScrollBounce()
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note, position: Point
    ) => {

        const liveLayers:any = storage.get('layers')
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds:any = storage.get('layerIds')
        const layerId = nanoid()
        const layer = new LiveObject(
            {
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: lastUsedColor
            }
        )
        liveLayerIds.push(layerId)
        liveLayers.set(layerId, layer)

        setMyPresence({ selection: [layerId] }, { addToHistory: true })
        setCanvasState({ mode: CanvasMode.None })
    }, [lastUsedColor])

    const translateSelectedLayers = useMutation((
        { storage, self }:any,
        point: Point
    ) => {

        if (CanvasState.mode !== CanvasMode.Translating) {
            return
        }

        const offset = {
            x: point.x - (CanvasState.current?.x ?? 0),
            y: point.y - (CanvasState.current?.y ?? 0),


        }

        const liveLayers:any = storage.get("layers")

        for (const id of self.presence.selection) {
            const layer = liveLayers.get(id)
            if (layer) {
                layer.update({
                    x: layer.get('x') + offset.x,
                    y: layer.get('y') + offset.y,
                })
            }
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point })
    }, [CanvasState])

    const unselectedLayers = useMutation((
        { self, setMyPresence }:any
    ) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] }, { addToHistory: true })
        }
    }, [])

    const updateSelectionNet = useMutation((
        { storage, setMyPresence },
        current: Point,
        origin: Point
    ) => {
        const rawLayers: any = storage.get('layers');
        const layers = rawLayers.toImmutable();
        setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
        const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current)
        setMyPresence({ selection: ids })
    }, [layerIds])

    const startMultiSelection = useCallback((
        current: Point,
        origin: Point
    ) => {
        if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
            setCanvasState({ mode: CanvasMode.SelectionNet, origin, current })
        }
    }, [])

    const continueDrawing = useMutation((
        { self, setMyPresence },
        point: Point,
        e: React.PointerEvent
    ) => {
        const { pencilDraft }: any = self.presence;
        if (CanvasState.mode !== CanvasMode.Pencil ||
            e.buttons !== 1 || pencilDraft == null

        ) {
            return;
        }

        setMyPresence({
            cursor: point,
            pencilDraft: pencilDraft.length === 1 && pencilDraft[0][0] === point.x &&
                pencilDraft[0][1] === point.y ? pencilDraft : [...pencilDraft, [point.x, point.y, e.pressure]]
        })

    }, [CanvasState.mode])

    const insertPath = useMutation((
        { storage, self, setMyPresence }

    ) => {
        const liveLayers: any = storage.get('layers')
        const { pencilDraft }: any = self.presence
        if (pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
            setMyPresence({ pencilDraft: null })
            return;
        }

        const id = nanoid()
        liveLayers?.set(
            id,
            new LiveObject(penPointsToPathLayer(
                pencilDraft,
                lastUsedColor
            ))
        )
        const liveLayerIds: any = storage.get("layerIds")

        liveLayerIds.push(id)

        setMyPresence({ pencilDraft: null })
        setCanvasState({ mode: CanvasMode.Pencil })

    }, [lastUsedColor])

    const startDrawing = useMutation((
        { setMyPresence },
        point: Point,
        pressure: number
    ) => {
        setMyPresence({
            pencilDraft: [[point.x, point.y, pressure]],
            penColor: lastUsedColor
        })

    }, [lastUsedColor])

    const resizeSelectedLayer = useMutation((
        { storage, self }:any,
        point: Point | any,
    ) => {
        if (CanvasState.mode !== CanvasMode.Resizing) {
            return
        }
        const bounds = resizeBounds(
            CanvasState.initialBounds,
            CanvasState.corner,
            point
        )
        const liveLayers: any = storage.get("layers")
        const layer = liveLayers.get(self.presence.selection[0])
        if (layer) {
            layer.update(bounds)
        }
    }, [CanvasState])

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,

    ) => {


        history.pause()
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner
        })

    }, [history])


    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,

        }))
    }, [])

    const onPointerMove = useMutation((
        {
            setMyPresence
        }, e: React.PointerEvent) => {

        e.preventDefault()
        const current = pointerEventToCanvasPoint(e, camera);

        if (CanvasState.mode === CanvasMode.Pressing) {
            startMultiSelection(current, CanvasState.origin)

        }
        else if (CanvasState.mode === CanvasMode.SelectionNet) {
            updateSelectionNet(current, CanvasState.origin)
            // resizeSelectedLayer(current)

        }
        else if (CanvasState.mode === CanvasMode.Translating) {
            translateSelectedLayers(current)
            // resizeSelectedLayer(current)

        } else if (CanvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current)
        }
        else if (CanvasState.mode === CanvasMode.Pencil) {
            continueDrawing(current, e)
        }

        setMyPresence({ cursor: current })
    }, [continueDrawing, CanvasState, updateSelectionNet, resizeSelectedLayer, camera, translateSelectedLayers, startMultiSelection])


    const onPointerLeave = useMutation(({
        setMyPresence
    }) => {
        setMyPresence({ cursor: null })
    }, [])

    const onPointerDown = useCallback((
        e: React.PointerEvent,

    ) => {
        const point = pointerEventToCanvasPoint(e, camera)
        if (CanvasState.mode === CanvasMode.Inserting) {
            return null
        }

        if (CanvasState.mode === CanvasMode.Pencil) {
            startDrawing(point, e.pressure)
            return
        }


        setCanvasState({ origin: point, mode: CanvasMode.Pressing })
    }, [camera, CanvasState.mode, setCanvasState, startDrawing])

    const onPointerUp = useMutation((
        {

        }, e) => {
        const point = pointerEventToCanvasPoint(e, camera)

        if (CanvasState.mode === CanvasMode.None || CanvasState.mode === CanvasMode.Pressing) {
            unselectedLayers()
            setCanvasState({
                mode: CanvasMode.None,
            })
        }
        else if (CanvasState.mode === CanvasMode.Pencil) {

            insertPath()
        }

        else if (CanvasState.mode === CanvasMode.Inserting) {
            insertLayer(CanvasState.layerType, point)
        } else {
            setCanvasState({
                mode: CanvasMode.None
            })
        }
        history.resume()
    }, [
        setCanvasState,
        camera,
        CanvasState,
        history,
        insertLayer,
        unselectedLayers,
        insertPath
    ])

    const selections = useOthersMapped((other) => other.presence.selection)

    const onLayerPointerDown = useMutation(({
        self, setMyPresence,
    }: any, e: React.PointerEvent,
        layerId: string
    ) => {

        if (CanvasState.mode === CanvasMode.Pencil || CanvasState.mode === CanvasMode.Inserting) {
            return
        }

        history.pause()
        e.stopPropagation()

        const point = pointerEventToCanvasPoint(e, camera)
        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point })
    }, [setCanvasState, camera, history, CanvasState.mode])


    const layerIdsColorSelection = useMemo(() => {
        const layerIdsColorSelection: Record<string, string> = {}
        for (const user of selections) {
            const [connectionId, selection]: any = user;

            for (const layerId of selection) {
                layerIdsColorSelection[layerId] = connectionIdToColor(connectionId)
            }

        }
        return layerIdsColorSelection
    }, [selections])

    const deleteLayers = useDeleteLayers()


    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            switch (e.key) {
                case "Delete":
                    deleteLayers();
                    break
                case "z": {
                    if (e.ctrlKey || e.metaKey) {
                        if (e.shiftKey) {
                            history.redo()
                        } else {
                            history.undo()
                        }
                        break;

                    }
                }

            }
        }

        document.addEventListener("keydown",onKeyDown)
        return ()=>{
            document.removeEventListener("keydown",onKeyDown)
        }
    }, [deleteLayers, history])


    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                CanvasState={CanvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo} canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}

            />
            <SelectionTools
                camera={camera}
                setLastUsedColor={setLastUsedColor}

            />
            <svg className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px,${camera.y}px)`
                    }}
                >
                    {layerIds && layerIds?.map((layerId: any) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdsColorSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                    {
                        CanvasState.mode === CanvasMode.SelectionNet && CanvasState
                            .current != null && (
                            <rect
                                className='fill-blue-500/5 stroke-blue-500 stroke-1'
                                x={Math.min(CanvasState.origin.x, CanvasState.current?.x)}
                                y={Math.min(CanvasState.origin.y, CanvasState.current?.y)}
                                width={Math.abs(CanvasState.origin.x - CanvasState.current.x)}
                                height={Math.abs(CanvasState.origin.y - CanvasState.current.y)}
                            />
                        )
                    }
                    <CursorPresence />
                    {pencilDraft != null && pencilDraft.length > 0 && (
                        <Path
                            points={pencilDraft}
                            fill={colorToCss(lastUsedColor)}
                            x={0}
                            y={0}
                        />
                    )}
                </g>
            </svg>
        </main>
    )

}