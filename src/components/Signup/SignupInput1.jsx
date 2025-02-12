import styled from "styled-components";
import TextInput from "./Input/textInput";
import Button1 from "../Button/Button1";
import { useState } from "react";
import Button2 from "../Button/Button2";
import ErrorMessage from "../Message/ErrorMessage";
import ApprovalMessage from "../Message/ApprovalMessage";

function SignupInput1({ onClickNext, onChange, data }) {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/;

  const [checkPassword, setCheckPassword] = useState("");
  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const isPasswordMatch = data.password && checkPassword === data.password;

  const passwordMessage = () => {
    if (!data.password) {
      return null;
    } else if (regex.test(data.password)) {
      return <ApprovalMessage size='12px'>사용 가능한 비밀번호입니다.</ApprovalMessage>;
    } else {
      return (
        <ErrorMessage size='12px'>
          비밀번호를 영문,숫자,특수문자(!@#$%^&*())를 포함하여 8자리 이상이어야 합니다.
        </ErrorMessage>
      );
    }
  };

  const checkPasswordMessage = () => {
    if(!checkPassword){
      return null
    } else if(checkPassword === data.password){
      return <ApprovalMessage size='12px'>비밀번호가 일치합니다.</ApprovalMessage>
    } else{
      return <ErrorMessage size='12px'>비밀번호가 일치하지 않습니다.</ErrorMessage>
    }
  }


  return (
    <>
      <SignupInputWrapper>
        <Title>회원가입</Title>
        <Form>
          <EmailBox>
            <EmailInput type="email" onChange={onChange} data={data.email}>
              이메일
            </EmailInput>
            <CheckButton height="40px">중복확인</CheckButton>
          </EmailBox>

          <div>
            <TextInput type="password" onChange={onChange} data={data.password}>
              비밀번호
            </TextInput>
            {passwordMessage()}
          </div>

          <div>
            <TextInput type="password" onChange={handleCheckPassword}>
              비밀번호 확인
            </TextInput>
            {checkPasswordMessage()}
          </div>
        </Form>
        <Buttons>
          <Button1
            onClick={onClickNext}
            width="90px"
            disabled={!data.email||!isPasswordMatch}
          >
            다음
          </Button1>
        </Buttons>
      </SignupInputWrapper>
    </>
  );
}

const SignupInputWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  text-align: center;
  margin: 0;
`;

const EmailBox = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
`;

const EmailInput = styled(TextInput)`
  flex-grow: 1;
`;

const CheckButton = styled(Button2)`
  align-self: flex-end;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default SignupInput1;
