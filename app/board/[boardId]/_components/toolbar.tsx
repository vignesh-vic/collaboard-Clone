"use client";

import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface ToolbarProps {

    CanvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export const Toolbar = ({

    CanvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo
}: ToolbarProps) => {

    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md  p-1 flex flex-col  gap-y-1  items-center shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                    isActive={
                        CanvasState.mode === CanvasMode.None ||
                        CanvasState.mode === CanvasMode.Translating ||
                        CanvasState.mode === CanvasMode.SelectionNet ||
                        CanvasState.mode === CanvasMode.Pressing ||
                        CanvasState.mode === CanvasMode.Resizing


                    }
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })}
                    isActive={
                        CanvasState.mode === CanvasMode.Inserting &&
                        CanvasState.layerType === LayerType.Text
                    }
                />
                <ToolButton
                    label="StickyNote"
                    icon={StickyNote}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Note,
                    })}
                    isActive={
                        CanvasState.mode === CanvasMode.Inserting &&
                        CanvasState.layerType === LayerType.Note
                    }
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Rectangle,
                    })}
                    isActive={
                        CanvasState.mode === CanvasMode.Inserting &&
                        CanvasState.layerType === LayerType.Rectangle
                    } />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Inserting,
                        layerType: LayerType.Ellipse,
                    })}
                    isActive={
                        CanvasState.mode === CanvasMode.Inserting &&
                        CanvasState.layerType === LayerType.Ellipse
                    } />
                <ToolButton
                    label="Pencil"
                    icon={Pencil}
                    onClick={() => setCanvasState({
                        mode: CanvasMode.Pencil,
                    })}
                    isActive={
                        CanvasState.mode === CanvasMode.Pencil} />
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButton
                    label='Undo'
                    icon={Undo2}
                    onClick={undo}
                    isDisabled={!canUndo}
                />
                <ToolButton
                    label='Redo'
                    icon={Redo2}
                    onClick={redo}
                    isDisabled={!canRedo}
                />

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