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
    private canvasColor: string = "#000000"
    private canvasWidth: number = 10
    private canvasOutline: string = "#000000"
    constructor() {
        makeAutoObservable(this)
    }
    setTool(tool: any) {
        this.toolP = tool
    }
    setCanvasColor(color: string) {
        if (this.toolP) {
            this.toolP.canvasColor = color
            this.canvasColor = color
        }
    }
    getCanvasColor() {
        return this.canvasColor
    }
    setCanvasWidth(width: number) {
        if (this.toolP) {
            this.toolP.canvasWidth = width
            this.canvasWidth = width
        }
    }
    getCanvasWidth() {
        return this.canvasWidth
    }
    setCanvasOutline(color: string) {
        if (this.toolP) {
            this.toolP.canvasOutline = color
            this.canvasOutline = color
        }
    }
    getCanvasOutline() {
        return this.canvasOutline
    }

    bindFN(fn: Function) {
        return fn.bind(this)
    }
}

export default new ToolState()