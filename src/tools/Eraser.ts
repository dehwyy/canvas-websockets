import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
    }

    draw(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = "white"
        this.ctx.arc(x, y, 5, 0, 360)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
    }
}