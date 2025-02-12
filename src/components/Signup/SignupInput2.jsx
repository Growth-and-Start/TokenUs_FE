import styled from "styled-components";
import TextInput from "./Input/textInput";
import Button2 from "../Button/Button2";
import Button1 from "../Button/Button1";
import ImgInput from "./Input/ImgInput";

function SignupInput2({ onClickPrevious, onClickSubmit, onChange, data }) {
  return (
    <>
      <SignupInputWrapper>
        <Title>회원가입</Title>
        <Form>
          <TextInput type="name" onChange={onChange} data={data.name}>
            이름
          </TextInput>
          <TextInput type="nick" onChange={onChange} data={data.nick}>
            닉네임
          </TextInput>
          <ImgInput type="file" name="profile" onChange={onChange} data={data.nick}>
            프로필 사진 선택
          </ImgInput>
        </Form>
        <Buttons>
          <Button2 onClick={onClickPrevious} width="90px">
            이전
          </Button2>
          <Button1 onClick={onClickSubmit} width="90px">
            완료
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SignupInput2;
