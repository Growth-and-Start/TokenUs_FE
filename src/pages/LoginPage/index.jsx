import styled from "styled-components";
import Button1 from "../../components/Button/Button1";
import TextInput from "../../components/Input/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CloseButton from "../../components/Button/CloseButton";
import { login } from "../../services/authService"; 

function LoginPage({ updateLoginStatus }) {

  //사용자 입력 데이터
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(""); 
    try {
      const response = await login(formData); 
      localStorage.setItem("accessToken", response); 
      updateLoginStatus(true); //
      navigate("/"); 
    } catch (error) {
      console.error("로그인 실패:", error);
      setError("이메일 또는 비밀번호가 잘못되었습니다."); 
    }
  };

  return (
    <>
      <LoginWrapper>
        <LoginBox>
          <CloseButton
            size="2x"
            color="#73798D"
            style={{ position: "absolute", top: "40px", right: "40px" }}
          />
          <Title>로그인</Title>
          <Form>
            <TextInput type="email" name="email" value={formData.email} onChange={handleChange}>
              이메일
            </TextInput>
            <TextInput type="password" name="password" value={formData.password} onChange={handleChange}>
              비밀번호
            </TextInput>
          </Form>
          {error && <ErrorMessage>{error}</ErrorMessage>} {/* 에러 메시지 표시 */}
          <ButtonWrapper>
            <Button1 width="170px" height="40px" fontSize="18px" onClick={handleSubmit}>
              로그인
            </Button1>
            <MoveToSignup>
              계정이 없으신가요? <StyledLink to="/signup">회원가입</StyledLink>
            </MoveToSignup>
          </ButtonWrapper>
        </LoginBox>
      </LoginWrapper>
    </>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
`;

const LoginBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 60vh;
  background-color: #f8f8ff;
  border-radius: 10px;
  border: 1.5px solid #d3d8e5;
  padding: 5%;
  box-shadow: -2px -2px 20px rgba(240, 238, 238, 0.127),
    2px -2px 20px rgba(240, 238, 238, 0.127),
    -2px 2px 20px rgba(240, 238, 238, 0.127),
    2px 2px 20px rgba(240, 238, 238, 0.127);
`;

const Title = styled.h2`
  text-align: center;
  margin: 0;
  flex-grow: 1;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex-grow: 3;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const MoveToSignup = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #535761;
`;

const StyledLink = styled(Link)`
  font-size: 13px;
  color: #535761;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

export default LoginPage;
