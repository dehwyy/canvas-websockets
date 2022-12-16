import {Btn, Tool as ToolComponent} from "../StyledComponents";
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Debouncer from "../custom/debounce";

const Toolbar = () => {
    const ctx = {value: canvasState.canvas} as {value: HTMLCanvasElement}
    const fn = toolState.bindFN(toolState.setCanvasColor)
    const deb = new Debouncer<string>(200, fn)
    return (
        <ToolComponent>
            <Btn onClick={() => toolState.setTool(new Brush(ctx.value))}><i className="material-icons">brush</i></Btn>
            <Btn onClick={() => toolState.setTool(new Rect(ctx.value))}><i className="material-icons">crop_square</i></Btn>
            <Btn onClick={() => toolState.setTool(new Circle(ctx.value))}><i className="material-icons">panorama_fish_eye</i></Btn>
            <Btn onClick={() => toolState.setTool(new Eraser(ctx.value))}><i className="material-icons">delete</i></Btn>
            <Btn onClick={() => toolState.setTool(new Line(ctx.value))}><i className="material-icons">linear_scale</i></Btn>
            <input onChange={(e) => deb.debounce(e.target.value)} type={"color"} style={{marginLeft: "10px", background: "white"}}/>
            <Btn onClick={() => canvasState.undoMove()} style={{marginLeft: "auto"}}><i className="material-icons">navigate_before</i></Btn>
            <Btn onClick={() => canvasState.redoMove()}><i className="material-icons">navigate_next</i></Btn>
            <Btn style={{marginRight: "10px"}}><i className="material-icons">save</i></Btn>
        </ToolComponent>
    );
};

export default Toolbar;