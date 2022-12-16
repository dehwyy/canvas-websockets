import {FC, lazy, Suspense} from "react";
import styled from "styled-components";
import Settingbar from "./components/Settingbar";
import Canvas from "./components/Canvas";
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
            <Suspense>
                <Toolbar />
            </Suspense>
            <Settingbar />
            <Canvas />
        </Wrapper>
    );
};

export default App;