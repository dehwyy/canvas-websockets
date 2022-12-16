import {Tool} from "./Tool";

export default class Circle extends Tool {
    mouseDown = false
    protected startX = 0;
    protected startY = 0;
    protected saved = ''
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
            let posX = e.offsetX
            let posY = e.offsetY
            let width = this.startX - posX
            let height = this.startY - posY
            this.draw(e.offsetX, e.offsetY, width, height)
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

    draw(x: number, y: number, w: number | undefined, h: number | undefined) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            if (h && w) {
                this.ctx.ellipse(this.startX, this.startY, Math.abs(w / 1.5), Math.abs(h / 1.5), 0, 0, 360)
                this.ctx.stroke()
                this.ctx.fill()
            }
        }


    }

}