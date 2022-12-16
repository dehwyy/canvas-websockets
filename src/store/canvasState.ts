import {makeAutoObservable} from "mobx";
import canvas from "../components/Canvas";

class CanvasState {
    canvas: HTMLCanvasElement | null = null;
    undo: string[] = []
    redo: string[] = []
    constructor() {
        makeAutoObservable(this)
    }
    setCanvas(canvas: any) {
        this.canvas = canvas
    }
    undoMove() {
        const cnvs = this.canvas
        if (cnvs) {
            const img = this.undo.pop()
            const ctx = cnvs.getContext("2d") as CanvasRenderingContext2D
            if (img) {
                this.redo.push(cnvs.toDataURL())
                const pic = new Image()
                pic.src = img
                pic.onload = () => {
                    ctx.clearRect(0, 0, cnvs.width, cnvs.height)
                    ctx.drawImage(pic, 0, 0, cnvs.width, cnvs.height)
                }
            }
        }


    }
    redoMove() {
        const cnvs = this.canvas
        if (cnvs) {
            const img = this.redo.pop()
            const ctx = cnvs.getContext("2d") as CanvasRenderingContext2D
            if (img) {
                this.undo.push(cnvs.toDataURL())
                const pic = new Image()
                pic.src = img
                pic.onload = () => {
                    ctx.clearRect(0, 0, cnvs.width, cnvs.height)
                    ctx.drawImage(pic, 0, 0, cnvs.width, cnvs.height)
                }
            }
        }
    }
    updateUndo() {
        const cnvs = this.canvas
        if (cnvs) {
            this.undo.push(cnvs.toDataURL())
        }
    }
}

export default new CanvasState()