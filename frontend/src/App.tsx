import {FC, lazy, Suspense, useEffect} from "react";
import styled from "styled-components";
import Settingbar from "./components/Settingbar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Routes, Route, Navigate, useParams} from "react-router-dom";
import Modal from "./components/Modal";
import {observer} from "mobx-react-lite";
import canvasState from "./store/canvasState";
const Toolbar = lazy(() => import("./components/Toolbar"))

const Wrapper = styled.div`
  height: 100vh;
  background-color: #e7e7e7;
  display: flex;
  flex-direction: column;
`



const App:FC = () => {

    return (
        <Wrapper>
            <Routes>
                <Route path=":id" element={
                    <>
                        <Suspense fallback={<div>toolbar</div>}>
                            <Toolbar />
                        </Suspense>
                        <Settingbar />
                        <Canvas />
                        <Modal />
                    </>
                } />
                <Route path='/' element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
            </Routes>
        </Wrapper>
    );
};

export default observer(App);