import React, {RefObject, useEffect, useRef} from 'react';
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import {useParams} from "react-router-dom";
import {IDraw} from "../tools/draw";
import axios from "axios";
import {AxiosResponse} from "axios";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import Eraser from "../tools/Eraser";

const CanvasDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CanvasBlock = styled.canvas`
  border: 2px solid #338ce1;
  background: white;
`

interface changeProp {
    method: string
    id: string
    type: string
    prop: string | number
}
const changeHandler = (msg: changeProp) => {
    switch (msg.type) {
        case "fillAndStroke":
            toolState.setCanvasColor(msg.prop as string)
            break
        case "stroke":
            toolState.setCanvasOutline(msg.prop as string)
            break
        case "width":
            toolState.setCanvasWidth(msg.prop as number)
            break
    }
}

const Canvas = () => {
    const cnvs = useRef() as RefObject<HTMLCanvasElement>
    const {id} = useParams()
    useEffect(() => {
        const cnvsOnload = cnvs.current
        if (cnvsOnload) {
            canvasState.setCanvas(cnvsOnload)
            axios.get(`http://localhost:727/img?id=${id}`).then((response: AxiosResponse) => {
                console.log(response)
                const img = new Image()
                const ctx = cnvsOnload.getContext("2d")
                if (ctx) {
                    img.src = response.data
                    img.onload = () => {
                        ctx.clearRect(0, 0, cnvsOnload.width, cnvsOnload.height)
                        ctx.drawImage(img, 0, 0,cnvsOnload.width, cnvsOnload.height)
                        ctx.stroke()
                    }
                }
            }).catch(() => {
                console.log("NO SUCH FILE")
            })
        }
    }, [])
    useEffect(() => {
        if (canvasState.username && cnvs.current && id) {
            const wb = new WebSocket("ws://localhost:727")
            canvasState.setCanvasId(id)
            canvasState.setSocket(wb)
            toolState.setTool(new Brush(cnvs.current, wb, id))
            wb.onopen = () => {
                wb.send(JSON.stringify({
                    id,
                    method: "connection",
                    username: canvasState.username
                }))
            }
            wb.onmessage = (e) => {
                const msg = JSON.parse(e.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`user ${msg.username} connected`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                    case "changeBrushSetting":
                        changeHandler(msg)
                        break
                    case "updateActions":
                        updateCanvasImgHandler(msg)
                        break
                }
            }
        }
    }, [canvasState.username])
    const updateCanvasImgHandler = (msg: any) => { // TYPESCRIPT
        const ctx = canvasState.canvas?.getContext("2d")
        const canvas = cnvs.current
        if (ctx && canvas) {
            const pic = new Image()
            pic.src = msg.img
            pic.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(pic, 0, 0, canvas.width, canvas.height)
            }
        }
    }
    const drawHandler = (msg: IDraw) => {
        const figure = msg.figure
        const ctx = cnvs.current?.getContext("2d")
        if (ctx) {
            switch (figure.type) {
                case "brush":
                    Brush.draw(ctx, figure.x, figure.y)
                    break
                case "rect":
                    Rect.draw(figure.savedImg ? figure.savedImg : '', ctx, figure.x, figure.y, figure.w, figure.h)
                    break
                case "circle":
                    Circle.draw(figure.savedImg ? figure.savedImg : '', ctx, figure.x, figure.y, figure.w, figure.h)
                    break
                case "line":
                    Line.draw(figure.savedImg ? figure.savedImg : '', ctx, figure.x, figure.y, figure.w, figure.h)
                    break
                case "eraser":
                    Eraser.erase(ctx, figure.x, figure.y)
            }
        }
    }

    const mouseDownHandler = () => {
        if (canvasState.wb) {
            canvasState.wb.send(JSON.stringify({
                method: "updateActions",
                type: "add",
                id: canvasState.id,
                img: canvasState.canvas?.toDataURL()
            }))
        }
    }

    const mouseUpHandler = () => {
        axios.post(`http://localhost:727/img?id=${id}`, {
            img: canvasState.canvas?.toDataURL()
        })
    }


    return (
        <CanvasDiv>
            <CanvasBlock onMouseDown={() => mouseDownHandler()} onMouseUp={() => mouseUpHandler()} ref={cnvs} width={1000} height={600} ></CanvasBlock>
        </CanvasDiv>
    );
};

export default observer(Canvas);