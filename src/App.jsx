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
import NFTDetailPage from "./pages/MarketplacePage/NFTDetailPage";
import TestTemp from "./pages/TestTemp";
import MyNFTPage from "./pages/MarketplacePage/MyNFTPage";

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
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/watch/:title" element={<WatchVideoPage />} />
            <Route path="/video-studio" element={<StudioPage />} />
            <Route path="/mypage" element={<MyPageLayout />}>
              <Route index element={<ProfilePage />} />
              <Route path="wallet" element={<WalletPage />} />
            </Route>
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/nft-info/:id" element={<NFTDetailPage />} />
            <Route path="/my-nft" element={<MyNFTPage />} />
            <Route path="/test" element={<TestTemp/>} />
          </Routes>
        </AppContent>
        <Footer />
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
`;

export default App;
