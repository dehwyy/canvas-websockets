import {Tool} from "./Tool";
import toolState from "../store/toolState";

export default class Circle extends Tool {
    mouseDown = false
    protected startX = 0;
    protected startY = 0;
    protected saved = ''
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
            let posX = e.offsetX
            let posY = e.offsetY
            let width = this.startX - posX
            let height = this.startY - posY
            this.socket?.send(JSON.stringify({
                method: "draw",
                id: this.id,
                figure: {
                    type: "circle",
                    x: this.startX,
                    y: this.startY,
                    w: width,
                    h: height,
                    savedImg: this.saved
                }
            }))
        }
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.offsetX
        this.startY = e.offsetY
        this.ctx.moveTo(e.offsetX, e.offsetY)
        this.saved = this.canvas.toDataURL()
    }

    static draw(savedImg: string, ctx: CanvasRenderingContext2D,  x: number, y: number, w: number | undefined, h: number | undefined) {
        const img = new Image()
        img.src = savedImg
        img.onload = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.beginPath()
            if (h && w) {
                ctx.lineWidth = toolState.getCanvasWidth()
                ctx.fillStyle = toolState.getCanvasColor()
                ctx.ellipse(x, y, Math.abs(w / 1.5), Math.abs(h / 1.5), 0, 0, 360)
                ctx.stroke()
                ctx.fill()
            }
        }
    }

}