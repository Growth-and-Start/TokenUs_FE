import styled from "styled-components";
import logo from "../../assets/logo_icon+text.png";
import { MAIN, GRAY_SCALE, BACKGROUND, TEXT } from "../../constants/colors";
import SearchBar from "../Input/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../User/Avatar";
import { HolderOutlined, MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../services/channelService";

function NavBar({ isLoggedIn, updateLoginStatus }) {
  const navigate = useNavigate();
  const [myData, setMyData] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateLoginStatus(false);
    navigate("/");
  };

  useEffect(()=>{
    const fetchMyInfo = async() =>{
      if(isLoggedIn){
        const response = await getMyInfo();
        setMyData(response);
      }
    }
    fetchMyInfo();
  },[])

  return (
    <NavWrapper>
      <Link to="/">
        <Logo src={logo} alt="Tokenus Logo" width="110px" />
      </Link>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <StyledLink to="/marketplace">NFT 마켓플레이스</StyledLink>
      {isLoggedIn ? (
        <>
          <StyledLink to="/video-studio">비디오 스튜디오</StyledLink>
          <Division>
            <HolderOutlined style={{ fontSize: '22px', color: GRAY_SCALE.GRAY500 }} />
          </Division>
          <AvatarLink to="/mypage">
            <Avatar size={35} src={myData.profileImageUrl}/>
            <Tooltip>마이페이지</Tooltip>
          </AvatarLink>

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
  padding: 16px 32px;
  border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
  display: flex;
  gap: 15px;
  width: 100%;
  height : 60px;
  box-sizing: border-box;
  align-items: center;
`;

const Logo = styled.img`
  display: flex;
  align-items: center;
  margin-left : 5px;
  margin-right : 15px;
`;

const SearchWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${TEXT.BLACK};
  display: flex;
  align-items: center;

  &:hover {
    color: ${MAIN.BLUE};
  }
`;

const Division = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarLink = styled(Link)`
  display: flex;
  align-items: center;
  position: relative;
  &:hover span {
    opacity: 1;
    visibility: visible;
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
