import styled from "styled-components";
import logo from "../../assets/logo_icon+text.png";
import Button1 from "../Button/Button1";
import { useNavigate } from "react-router-dom";

function SignupComplement() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <ComplementWrapper>
        <Logo src={logo} alt="Tokenus Logo" />
        <Text>
          회원가입이 정상적으로 <span>완료되었습니다.</span>
        </Text>
        <Button1
          onClick={goToLogin}
          width="170px"
          height="40px"
          fontSize="18px"
        >
          로그인하기
        </Button1>
      </ComplementWrapper>
    </>
  );
}

const ComplementWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 80px 0;
`;

const Logo = styled.img`
  width: 200px;
`;

const Text = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 23px;
`;


export default SignupComplement;
