import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {Input as InputStyled} from "./Settingbar";
import CanvasState from "../store/canvasState";


//styles
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(150, 150, 150, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 20px;
`
const ModalDivWrapper = styled.div`
  width: 410px;
  height: 250px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-radius: 5px;
  box-shadow: 0 3px 5px black;
`
const modalDiv = styled.div` // used only as parent component
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`
const Udiv = styled(modalDiv)`
  height: 70%;
  box-shadow: 0 2px 1px #dadada;
  z-index: 2;
  font-size: 25px;
  text-decoration: underline black;
`
const Mdiv = styled(modalDiv)`
  justify-content: space-between;
`
const Ldiv = styled(modalDiv)`
  box-shadow: 0 -2px 1px #dadada;
  z-index: 2;
  height: 70%;
  justify-content: space-between;
`
const TextInput = styled(InputStyled)`
  font-size: 22px;
  width: 85%;
`
const InputAlign = styled.div`
  width: 55%;
`
const FlexAlignedDiv = styled.div`
  margin-left: 10px;
`
const FlexAlignedBtn = styled(FlexAlignedDiv)`
  margin-right: 10px;

  & button {
    background: #3391ff;
    font-size: 20px;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
`

const Modal = () => {
    const [isOpen, setOpen] = useState<boolean>(true)
    const userInput = useRef() as React.RefObject<HTMLInputElement>
    const onClose = () => {
        if (userInput.current?.value) {

            CanvasState.setUsername(userInput.current.value)
            setOpen(false)
        }
    }
    return isOpen ? (
        <ModalWrapper>
            <ModalDivWrapper>
                <Udiv>
                    <FlexAlignedDiv>
                        LOGIN
                    </FlexAlignedDiv>
                </Udiv>
                <Mdiv>
                    <FlexAlignedDiv>
                        Enter username:
                    </FlexAlignedDiv>
                    <InputAlign>
                        <TextInput ref={userInput}/>
                    </InputAlign>
                </Mdiv>
                <Ldiv>
                    <FlexAlignedDiv style={{margin: "20px"}}>
                        *
                    </FlexAlignedDiv>
                    <FlexAlignedBtn>
                        <button onClick={onClose}>
                            Confirm
                        </button>
                    </FlexAlignedBtn>
                </Ldiv>
            </ModalDivWrapper>
        </ModalWrapper>
    ): <></>
};

export default Modal;