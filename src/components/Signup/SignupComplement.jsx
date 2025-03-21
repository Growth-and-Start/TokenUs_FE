import styled from "styled-components";
import logo from "../../assets/logo_icon+text.png";
import Button1 from "../Button/Button1";
import { useNavigate } from "react-router-dom";

function SignupComplement() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];
        console.log("✅ 지갑 주소:", walletAddress);
        alert(`지갑이 연결되었습니다:\n${walletAddress}`);
      } catch (error) {
        console.error("❌ 지갑 연결 실패:", error);
        alert("지갑 연결에 실패했습니다.");
      }
    } else {
      alert("메타마스크가 설치되어 있지 않습니다.");
    }
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
        <WalletConnectText onClick={connectWallet}>
          내 지갑 연결하기
        </WalletConnectText>
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

const WalletConnectText = styled.span`
  margin-top: 10px;
  font-size: 13px;
  color: #535761;
  cursor: pointer;
  text-decoration: underline;
`;

export default SignupComplement;
