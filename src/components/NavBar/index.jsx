import styled from "styled-components";
import logo from "../../assets/logo_icon+text.png";
import { GRAY_SCALE, BACKGROUND, TEXT } from "../../constants/colors";
import SearchBar from "../Input/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar({ isLoggedIn, updateLoginStatus }) {
  const navigate = useNavigate();

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    updateLoginStatus(false); 
    navigate("/"); 
  };

  return (
    <NavWrapper>
      <Link to="/">
        <Logo src={logo} alt="Tokenus Logo" width="110px" />
      </Link>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <StyledLink to="/exchange">NFT 거래소</StyledLink>
      {isLoggedIn ? (
        <>
          <StyledLink to="/video-studio">비디오 스튜디오</StyledLink>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </>
      ) : (
        <StyledLink to="/login">로그인</StyledLink>
      )}
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  background-color: ${BACKGROUND.WHITE};
  padding: 8px 10px;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.img`
  margin: 0 15px;
  display: flex;
  align-items: center;
`;

const SearchWrapper = styled.div`
  flex-grow: 1;
  margin: 0 15px;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${TEXT.BLACK};
  margin: 0 15px;
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${TEXT.BLACK};
  margin: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
`;

export default NavBar;
