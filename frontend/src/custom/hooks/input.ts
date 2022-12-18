import {useCallback, useEffect, useState} from "react";
import canvasState from "../../store/canvasState";
import toolState from "../../store/toolState";
import Debouncer from "../debounce";

type typeOfValue = "stroke" | "fillAndStroke" | "width"

const useCanvasInput = <T>(type: typeOfValue, initState: T) => {
    const [prop, setProp] = useState<T>(initState)
    const changeProp = (prop: T) => {
        setProp(prop)
        const socket = canvasState.wb
        if (socket) {
            socket.send(JSON.stringify({
                method: "changeBrushSetting",
                id: canvasState.id,
                type,
                prop
            }))
        }
    }
    switch (type) {
        case "stroke":
            useEffect(() => {
                setProp(toolState.getCanvasOutline() as T)
            }, [toolState.getCanvasOutline()])
            break
        case "fillAndStroke":
            useEffect(() => {
                setProp(toolState.getCanvasColor() as T)
            }, [toolState.getCanvasColor()])
            break
        case "width":
            useEffect(() => {
                setProp(toolState.getCanvasWidth() as T)
            }, [toolState.getCanvasWidth()])
            break
    }
    return [
        prop, changeProp
    ] as const
}

export default useCanvasInput
