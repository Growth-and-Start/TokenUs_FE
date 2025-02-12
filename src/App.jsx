import styled from "styled-components";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import StudioPage from "./pages/StudioPage";
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <>
      <AppWrapper>
        <FixedNavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/video-studio" element={<StudioPage />} />
        </Routes>
      </AppWrapper>
    </>
  );
}

const AppWrapper = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
`;

const FixedNavBar = styled(NavBar)`
  position: fixed;
  top: 0; 
  left: 0;
  z-index: 1000; 
`

export default App;
