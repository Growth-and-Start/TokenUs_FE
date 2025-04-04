import styled from "styled-components";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import StudioPage from "./pages/StudioPage";
import LoginPage from "./pages/LoginPage";
import SearchResultPage from "./pages/SearchResultPage";
import MyPageLayout from "./layout/MyPageLayout";
import ProfilePage from "./pages/MyPage";
import WalletPage from "./pages/MyPage/WalletPage";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  //로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  // 로그인 상태 변경 함수
  const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <AppWrapper>
        <FixedNavBar
          isLoggedIn={isLoggedIn}
          updateLoginStatus={updateLoginStatus}
        />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage updateLoginStatus={updateLoginStatus}/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/video-studio" element={<StudioPage />} />
          <Route path="/search" element={<SearchResultPage/>} />

          <Route path="/mypage" element={<MyPageLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
          </Route>
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
`;

export default App;
