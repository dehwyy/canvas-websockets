import Brush from "./Brush";
import toolState from "../store/toolState";

export default class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.type = "eraser"
    }

    static erase(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.beginPath()
        const oldStrokeStyle = ctx.strokeStyle
        const oldFillStyle = ctx.fillStyle
        ctx.fillStyle = "white"
        ctx.strokeStyle = "white"
        ctx.lineWidth = toolState.getCanvasWidth()
        ctx.arc(x, y, 5, 0, 360)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.strokeStyle = oldStrokeStyle
        ctx.fillStyle = oldFillStyle
    }
}