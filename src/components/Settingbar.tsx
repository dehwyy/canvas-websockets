import React, {useId} from 'react';

import {Btn, Setting} from "../StyledComponents";
import styled from "styled-components";
import toolState from "../store/toolState";
import Debouncer from "../custom/debounce";

const InputWrapper = styled.div`
  margin: 0 0 0 10px;
`
const Label = styled.label`
  color: white;
  font-family: "Fira Code", monospace;
  font-size: 20px;
  word-spacing: -5px;
  margin: 0 10px 0 0;
`
const Input = styled.input`
  &:focus {
    outline: 2px solid black;
  }
`

const Settingbar = () => {
    const id1 = useId()
    const id2= useId()
    const width = toolState.bindFN(toolState.setCanvasWidth)
    const strokeColor = toolState.bindFN(toolState.setCanvasOutline)
    const debNum = new Debouncer<number>(200, width)
    const debColor = new Debouncer<string>(200, strokeColor)
    return (
        <Setting>
            <InputWrapper>
                <Label htmlFor={id1}>Толщина линии</Label>
                <Input
                    onChange={(event) => debNum.debounce(Number(event.target.value))}
                    id={id1}
                    defaultValue={10}
                    type="number"
                    style={{height: "20px"}}/>
            </InputWrapper>
            <InputWrapper>
                <Label htmlFor={id2}>Цвет обводки(Для фигур)</Label>
                <Btn><input onChange={(e) => debColor.debounce(e.target.value)} id={id2} type={"color"} style={{background: "white"}}/></Btn>
            </InputWrapper>
        </Setting>
    );
};

export default Settingbar;