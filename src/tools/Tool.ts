export class Tool {
    ctx: CanvasRenderingContext2D;
    static canvasColor: string;
    static canvasWidth: number;
    static canvasOutline: string;
    constructor(
        public canvas: HTMLCanvasElement
    ) {
        this.ctx = canvas?.getContext("2d") as CanvasRenderingContext2D
        this.ctx.lineWidth = 10
        this.destroyAllListeners()
    }

    destroyAllListeners() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }

    set canvasColor(color: string) {
        this.ctx.fillStyle = color
        this.canvasOutline = color
    }

    set canvasWidth(width: number) {
        this.ctx.lineWidth = width
    }

    set canvasOutline(color: string) {
        this.ctx.strokeStyle = color
    }
}