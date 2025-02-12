import styled from "styled-components";
import logo from "../../assets/logo_icon+text.png";
import { GRAY_SCALE, BACKGROUND,TEXT } from "../../constants/colors";
import SearchBar from "../Input/SearchBar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <NavWrapper>
      <Link to="/">
        <Logo src={logo} alt="Tokenus Logo" width="110px" />
      </Link>
      <SearchWrapper>
        <SearchBar />
      </SearchWrapper>
      <StyledLink to="/">NFT 거래소</StyledLink>
      <StyledLink to="/login">로그인</StyledLink>
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


export default NavBar;
