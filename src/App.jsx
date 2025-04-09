import styled from "styled-components";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import StudioPage from "./pages/StudioPage";
import LoginPage from "./pages/LoginPage";
import SearchResultPage from "./pages/SearchResultPage";
/* import Test from "./pages/TestTemp"; */
import { useState, useEffect } from "react";
import WatchVideoPage from "./pages/WatchVideoPage";
import MarketplacePage from "./pages/MarketplacePage";
import MyPageLayout from "./layout/MyPageLayout";
import ProfilePage from "./pages/MyPage";
import WalletPage from "./pages/MyPage/WalletPage";
import Footer from "./components/Footer";

function App() {
  //로그인 상태
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

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
        <AppContent>
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* 메인 홈*/}
          <Route
            path="/login"
            element={<LoginPage updateLoginStatus={updateLoginStatus} />}
          />
          {/*로그인*/}
          <Route path="/signup" element={<SignupPage />} /> {/*회원 가입*/}
          <Route path="/search" element={<SearchResultPage />} />
          {/*검색 결과*/}
          <Route path="/watch/:title" element={<WatchVideoPage />} />
          {/*영상 시청*/}
          <Route path="/video-studio" element={<StudioPage />} />
          {/*비디오 업로드 관리*/}
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="wallet" element={<WalletPage />} />
          </Route>
          {/*마이 페이지*/}
          <Route path="/marketplace" element={<MarketplacePage />} />
          {/*NFT 거래소*/}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
        </AppContent>
        <Footer/>
      </AppWrapper>
    </>
  );
}

const AppWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
`;

const FixedNavBar = styled(NavBar)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
`;

const AppContent = styled.div`
  flex-grow: 1;
`


export default App;
