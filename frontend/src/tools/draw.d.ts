export interface IDraw {
    method: string
    id: string
    figure: {
        type: "circle" | "rect" | "brush" | "eraser" | "line"
        x: number
        y: number
        w?: number
        h?: number
        savedImg?: string
    }
}