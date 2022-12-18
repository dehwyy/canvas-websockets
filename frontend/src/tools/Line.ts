import {Tool} from "./Tool";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";

export default class Line extends Tool {
    private mouseDown = false
    private startX = 0;
    private startY = 0;
    private saved = ''
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.socket?.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: "line",
                    x: e.offsetX,
                    y: e.offsetY,
                    w: this.startX,
                    h: this.startY,
                    savedImg: this.saved
                }
            }))
        }
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.startX = e.offsetX
        this.startY = e.offsetY
        this.saved = this.canvas.toDataURL()
    }

    static draw(savedImg: string, ctx: CanvasRenderingContext2D,  x: number, y: number, w: number | undefined, h: number | undefined) {
        const img = new Image()
        img.src = savedImg
        img.onload = () => {
            ctx.clearRect(0, 0, ctx.canvas.width,ctx.canvas.height)
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.beginPath()
            if (w && h) {
                ctx.lineWidth = toolState.getCanvasWidth()
                ctx.moveTo(w, h)
                ctx.lineTo(x, y)
                ctx.stroke()
            }
        }


    }

}