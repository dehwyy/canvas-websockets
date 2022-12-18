import {Tool} from "./Tool";
import toolState from "../store/toolState";

export default class Brush extends Tool {
    private mouseDown = false
    protected type = "brush"
    constructor(
        public canvas: HTMLCanvasElement,
        public socket: WebSocket,
        public id: string
    ) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: this.type,
                    x: e.offsetX,
                    y: e.offsetY
                }
            }))
        }
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.moveTo(e.offsetX, e.offsetY)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false

    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, 360)
        ctx.lineWidth = toolState.getCanvasWidth()
        ctx.fillStyle = toolState.getCanvasOutline()
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }

}