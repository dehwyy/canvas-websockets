import {Tool} from "./Tool";

export default class Line extends Tool {
    private mouseDown = false
    private startX = 0;
    private startY = 0;
    private saved = ''
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
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
            this.draw(e.offsetX, e.offsetY)
        }
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.startX = e.offsetX
        this.startY = e.offsetY
        this.saved = this.canvas.toDataURL()
    }

    draw(x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }


    }

}