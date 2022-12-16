import {Tool} from "./Tool";
import {ITool} from "../store/toolState";

export default class Brush extends Tool {
    private mouseDown = false
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(e.offsetX, e.offsetY)
        }
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.moveTo(e.offsetX, e.offsetY)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
    }

    draw(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, 5, 0, 360)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
    }

}