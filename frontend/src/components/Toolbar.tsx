import {Btn, Tool as ToolComponent} from "../StyledComponents";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import {observer} from "mobx-react-lite";
import useCanvasInputDebouncing from "../custom/hooks/inputDebouncing";
import {useId} from "react";
import {Label} from "./Settingbar";

const Toolbar = () => {
    const id = useId()
    const ctx = {value: canvasState.canvas} as {value: HTMLCanvasElement}
    const [inputColor, _, setInputColor] = useCanvasInputDebouncing<string>("fillAndStroke", "#000000")
    const download = () => {
        if (canvasState.canvas) {
            const url = canvasState.canvas.toDataURL()
            const a = document.createElement('a')
            a.href = url
            a.download = canvasState.id + ".jpg"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }

    const undoHandler = () => {
        if (canvasState.wb) {
            canvasState.wb.send(JSON.stringify({
                method: "updateActions",
                type: "undo",
                id: canvasState.id,
                imgRef: canvasState.canvas?.toDataURL()
            }))
        }
    }

    const redoHandler = () => {
        if (canvasState.wb) {
            canvasState.wb.send(JSON.stringify({
                method: "updateActions",
                type: "redo",
                id: canvasState.id,
                img: canvasState.canvas?.toDataURL()
            }))
        }
    }

    return (
        <ToolComponent>
            <Btn onClick={() => toolState.setTool(new Brush(ctx.value, canvasState.wb as WebSocket, canvasState.id))}><i className="material-icons">brush</i></Btn>
            <Btn onClick={() => toolState.setTool(new Rect(ctx.value,  canvasState.wb as WebSocket, canvasState.id))}><i className="material-icons">crop_square</i></Btn>
            <Btn onClick={() => toolState.setTool(new Circle(ctx.value, canvasState.wb as WebSocket, canvasState.id))}><i className="material-icons">panorama_fish_eye</i></Btn>
            <Btn onClick={() => toolState.setTool(new Eraser(ctx.value, canvasState.wb as WebSocket, canvasState.id))}><i className="material-icons">delete</i></Btn>
            <Btn onClick={() => toolState.setTool(new Line(ctx.value, canvasState.wb as WebSocket, canvasState.id))}><i className="material-icons">linear_scale</i></Btn>
            <Label htmlFor={id}>Цвет заливки</Label>
            <input onChange={(e) => setInputColor(e.target.value)} value={inputColor} type={"color"} id={id} style={{marginLeft: "10px", background: "white"}}/>
            <Btn onClick={() => undoHandler()} style={{marginLeft: "auto"}}><i className="material-icons">navigate_before</i></Btn>
            <Btn onClick={() => redoHandler()}><i className="material-icons">navigate_next</i></Btn>
            <Btn onClick={() => download()} style={{marginRight: "10px"}}><i className="material-icons">save</i></Btn>
        </ToolComponent>
    );
};

export default observer(Toolbar);