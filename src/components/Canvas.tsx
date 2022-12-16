import React, {RefObject, useEffect, useRef} from 'react';
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

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

const Canvas = () => {
    const cnvs = useRef() as RefObject<HTMLCanvasElement>

    useEffect(() => {
        console.log(cnvs.current)
        if (cnvs.current) {
            canvasState.setCanvas(cnvs.current)
            toolState.setTool(new Brush(cnvs.current))
        }
    }, [])
    return (
        <CanvasDiv>
            <CanvasBlock onMouseDown={() => canvasState.updateUndo()} ref={cnvs} width={600} height={400} ></CanvasBlock>
        </CanvasDiv>
    );
};

export default observer(Canvas);