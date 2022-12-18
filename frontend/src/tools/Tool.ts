export class Tool {
    ctx: CanvasRenderingContext2D;
    static canvasColor: string;
    static canvasWidth: number;
    static canvasOutline: string;
    constructor(
        public canvas: HTMLCanvasElement,
        public socket: WebSocket | null,
        public id: string
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
        Tool.canvasColor = color
    }

    get canvasColor() {
        return Tool.canvasColor
    }

    set canvasWidth(width: number) {
        this.ctx.lineWidth = width
    }


    set canvasOutline(color: string) {
        this.ctx.strokeStyle = color
    }

}