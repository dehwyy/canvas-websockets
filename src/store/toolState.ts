import {makeAutoObservable} from "mobx";

interface IToolExtension {
    listen?: () => void
    mouseUpHandler?: (e: MouseEvent) => void
    mouseMoveHandler?: (e: MouseEvent) => void
    mouseDownHandler?: (e: MouseEvent) => void
    draw?: (x: number, y: number, w?: number, h?: number) => void
}

export interface ITool extends IToolExtension{
    canvasColor: string
    canvasWidth: number;
    canvasOutline: string;
    destroyAllListeners: () => void
    ctx: CanvasRenderingContext2D
    canvas: HTMLCanvasElement
}

class ToolState {
    private toolP: ITool | undefined | null = null
    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool: any) {
        this.toolP = tool
        console.log(this.toolP)
    }
    setCanvasColor(color: string) {
        console.log(this.toolP, color)
        if (this.toolP) {
            this.toolP.canvasColor = color
        }
    }
    setCanvasWidth(width: number) {
        if (this.toolP) {
            this.toolP.canvasWidth = width
        }
    }
    setCanvasOutline(color: string) {
        console.log(color)
        if (this.toolP) {
            this.toolP.canvasOutline = color
        }
    }

    bindFN(fn: Function) {
        return fn.bind(this)
    }
}

export default new ToolState()