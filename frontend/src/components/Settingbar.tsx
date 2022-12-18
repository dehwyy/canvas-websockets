import React, {useEffect, useId, useState} from 'react';

import {Btn, Setting} from "../StyledComponents";
import styled from "styled-components";
import toolState from "../store/toolState";
import Debouncer from "../custom/debounce";
import {observer} from "mobx-react-lite";
import useCanvasInputDebouncing from "../custom/hooks/inputDebouncing";
import useCanvasInput from "../custom/hooks/input";

const InputWrapper = styled.div`
  margin: 0 0 0 10px;
`
export const Label = styled.label`
  color: white;
  font-family: "Fira Code", monospace;
  font-size: 20px;
  word-spacing: -5px;
  margin: 0 10px;
`
export const Input = styled.input`
  &:focus {
    border: 2px solid black;
    border-radius: 1px;
  }
`


const Settingbar = () => {
    const id1 = useId()
    const id2= useId()
    const [inputWidth, setInputWidth, setInputWidthWS] = useCanvasInputDebouncing<number>("width", 10)
    const [inputColor, _, setInputColorWS] = useCanvasInputDebouncing<string>("stroke", "#000000")
    const [inputN, setInputN] = useCanvasInput<number>("width", 10)
    return (
        <Setting>
            <InputWrapper>
                <Label htmlFor={id1}>Толщина линии</Label>
                <Input
                    onChange={(event) => setInputN(Number(event.target.value))}
                    id={id1}
                    value={inputN ? inputN : ""}
                    style={{height: "20px"}}/>
            </InputWrapper>
            <InputWrapper>
                <Label htmlFor={id2}></Label>
                <Btn><input onChange={(e) => setInputColorWS(e.target.value)} value={inputColor} id={id2} type={"color"} style={{background: "white"}}/></Btn>
            </InputWrapper>
        </Setting>
    );
};

export default observer(Settingbar);