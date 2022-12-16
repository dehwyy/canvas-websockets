import styled from "styled-components";

const Bar = styled.div`
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #338ce1;
`

export const Tool = styled(Bar)`
  border-bottom: 5px solid white;
  display: flex;
`

export const Setting = styled(Bar)`
    
`

export const Btn = styled.button`
  margin-left: 10px;
  height: 35px;
  outline: none;
  background: transparent;
  border: none;
  font-size: 20px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
  & i {
    font-size: 35px;
  }
`

