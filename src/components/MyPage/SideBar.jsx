import styled from "styled-components";
import { NavLink, useLocation } from 'react-router-dom';
import FONT from "../../constants/fonts";
import { GRAY_SCALE, TEXT, SECONDARY } from "../../constants/colors";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled(NavLink)`
  ${FONT.BODY1}
  padding : 15px;
  width : 180px;
  height : 20px;
  border-radius : 5px;
  text-decoration: none;
  color : ${GRAY_SCALE.GRAY700};

  &.active {
    color : ${TEXT.BLACK};
    background-color : ${SECONDARY.BLUE};
    box-shadow : 1px 1px 7px ${GRAY_SCALE.GRAY300};
  }

  &:hover {
    box-shadow : 1px 1px 7px ${GRAY_SCALE.GRAY300};
  }
`;

const SideBar = () => {
  const location = useLocation();

  const pathname = location.pathname === "/mypage" ? "/mypage" : location.pathname;
/*
  const menuItems = [
    { label: '프로필 수정', path: '/MyPage' },
    { label: '연결된 지갑 관리', path: '/MyPage/wallet' },
    { label: '채널 관리', path: '/MyPage/channels' },
    { label: '보유 NFT 조회', path: '/MyPage/nfts' },
    { label: '개인정보 및 데이터', path: '/MyPage/privacy' },
  ];
*/
  return (
    <Nav>
      <MenuItem
        to="/mypage"
        end
      >
        프로필 수정
      </MenuItem>
      <MenuItem to="/mypage/wallet">연결된 지갑 관리</MenuItem>
      <MenuItem to="/mypage/channels">채널 관리</MenuItem>
      <MenuItem to="/mypage/nfts">보유 NFT 조회</MenuItem>
      <MenuItem to="/mypage/privacy">개인정보 및 데이터</MenuItem>
    </Nav>
  );
};

export default SideBar;