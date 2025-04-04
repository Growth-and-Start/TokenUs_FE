import styled from "styled-components";
import TextInput from "../Input/TextInput";
import Button1 from "../Button/Button1";
import { useState } from "react";
import Button2 from "../Button/Button2";
import ErrorMessage from "../Message/ErrorMessage";
import ApprovalMessage from "../Message/ApprovalMessage";
import { checkEmail } from "../../services/authService";

function SignupInput1({ onClickNext, onChange, data }) {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/;

  const [checkPassword, setCheckPassword] = useState("");
  const [emailCheckStatus, setEmailCheckStatus] = useState(null);
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState({ type: null, text: "" });
  const [checkPasswordMessage, setCheckPasswordMessage] = useState({ type: null, text: "" });

  const isPasswordMatch = data.password && checkPassword === data.password;

  // 이메일 중복 확인 요청
  const handleCheckEmail = async () => {
    if (!data.email) {
      setEmailCheckStatus(false);
      setEmailCheckMessage("이메일을 입력해주세요.");
      return;
    }

    try {
      const isAvailable = await checkEmail(data.email);
      if (!isAvailable) {
        setEmailCheckStatus(true);
        setEmailCheckMessage("사용 가능한 이메일입니다.");
      } else {
        setEmailCheckStatus(false);
        setEmailCheckMessage("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      setEmailCheckStatus(false);
      setEmailCheckMessage("확인 중 오류가 발생했습니다.");
    }
  };

  // 이메일 입력 변경
  const handleEmailChange = (e) => {
    onChange(e);
    setEmailCheckStatus(null);
    setEmailCheckMessage("");
  };

  // 비밀번호 입력 변경 및 유효성 메시지 업데이트
  const handlePasswordChange = (e) => {
    onChange(e); // 부모에게 전달
    const value = e.target.value;

    if (!value) {
      setPasswordMessage({ type: null, text: "" });
    } else if (regex.test(value)) {
      setPasswordMessage({ type: "success", text: "사용 가능한 비밀번호입니다." });
    } else {
      setPasswordMessage({
        type: "error",
        text: "비밀번호를 영문, 숫자, 특수문자(!@#$%^&*()) 포함 8자 이상 입력해주세요.",
      });
    }

    // checkPasswordMessage도 함께 업데이트 
    if (!checkPassword || !value) {
      setCheckPasswordMessage({ type: null, text: "" });
    } else if (checkPassword === value) {
      setCheckPasswordMessage({ type: "success", text: "비밀번호가 일치합니다." });
    } else {
      setCheckPasswordMessage({ type: "error", text: "비밀번호가 일치하지 않습니다." });
    }
  };

  // 비밀번호 확인 입력 변경
  const handleCheckPasswordChange = (e) => {
    const value = e.target.value;
    setCheckPassword(value);

    if (!value || !data.password) {
      setCheckPasswordMessage({ type: null, text: "" });
    } else if (value === data.password) {
      setCheckPasswordMessage({ type: "success", text: "비밀번호가 일치합니다." });
    } else {
      setCheckPasswordMessage({ type: "error", text: "비밀번호가 일치하지 않습니다." });
    }
  };

  return (
    <SignupInputWrapper>
      <Title>회원가입</Title>
      <Form>
        <div>
          <EmailBox>
            <EmailInput
              type="email"
              name="email"
              onChange={handleEmailChange}
              data={data.email}
            >
              * 이메일
            </EmailInput>
            <CheckButton height="40px" onClick={handleCheckEmail}>
              * 중복확인
            </CheckButton>
          </EmailBox>
          <MessageWrapper>
            {emailCheckStatus !== null &&
              (emailCheckStatus ? (
                <ApprovalMessage size="12px">{emailCheckMessage}</ApprovalMessage>
              ) : (
                <ErrorMessage size="12px">{emailCheckMessage}</ErrorMessage>
              ))}
          </MessageWrapper>
        </div>

        <div>
          <TextInput
            type="password"
            name="password"
            onChange={handlePasswordChange}
            data={data.password}
          >
            * 비밀번호
          </TextInput>
          <MessageWrapper>
            {passwordMessage.type === "success" && (
              <ApprovalMessage size="12px">{passwordMessage.text}</ApprovalMessage>
            )}
            {passwordMessage.type === "error" && (
              <ErrorMessage size="12px">{passwordMessage.text}</ErrorMessage>
            )}
          </MessageWrapper>
        </div>

        <div>
          <TextInput type="password" onChange={handleCheckPasswordChange}>
            * 비밀번호 확인
          </TextInput>
          <MessageWrapper>
            {checkPasswordMessage.type === "success" && (
              <ApprovalMessage size="12px">{checkPasswordMessage.text}</ApprovalMessage>
            )}
            {checkPasswordMessage.type === "error" && (
              <ErrorMessage size="12px">{checkPasswordMessage.text}</ErrorMessage>
            )}
          </MessageWrapper>
        </div>
      </Form>

      <Buttons>
        <Button1
          onClick={onClickNext}
          width="90px"
          disabled={!data.email || !isPasswordMatch || emailCheckStatus !== true}
        >
          다음
        </Button1>
      </Buttons>
    </SignupInputWrapper>
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

const MessageWrapper = styled.div`
  height: 24px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default SignupInput1;
