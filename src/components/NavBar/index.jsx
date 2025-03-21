import styled from "styled-components";
import logo from "../../assets/logo_icon+text.png";
import { MAIN, GRAY_SCALE, BACKGROUND, TEXT } from "../../constants/colors";
import SearchBar from "../Input/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavBar({ isLoggedIn, updateLoginStatus }) {
  const navigate = useNavigate();

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
          <IconWrapper onClick={handleLogout}>
            <StyledIcon icon={faArrowRightFromBracket} size="lg" />
            <Tooltip>로그아웃</Tooltip>
          </IconWrapper>
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

  &:hover {
    color: ${MAIN.BLUE};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${GRAY_SCALE.GRAY500};
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: ${MAIN.BLUE};
  }
`;

const IconWrapper = styled.div`
  position: relative;
  margin: 0 15px;
  display: flex;
  align-items: center;

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: 130%; 
  left: 50%;
  transform: translateX(-50%);
  background-color: ${MAIN.BLUE};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
`;

export default NavBar;
