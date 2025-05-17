import styled from "styled-components";
import FONT from "../../constants/fonts";
import { MAIN, TEXT, GRAY_SCALE } from "../../constants/colors";
import Avatar from "../../components/User/Avatar.jsx";
import Button2 from "../../components/Button/Button2";
import Button1 from "../../components/Button/Button1";
import TextInput from "../../components/Input/TextInput.jsx";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../services/channelService.js";

const LabelInput = ({ label, ...props }) => (
  <InputWrapper>
    <Subtitle>{label}</Subtitle>
    <TextInput {...props} />
  </InputWrapper>
);

const ProfilePage = () => {
  const [myData, setMyData] = useState("");

  //기존 사용자 정보 가져오기
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const userData = await getMyInfo();
        setMyData(userData);
      } catch (error) {
        console.log("🚫사용자 정보 가져오기 실패: ", error);
      }
    };

    fetchMyData();
  }, []);

  return (
    <PageWrapper>
      {/* 프로필 정보 */}
      <Section>
        <Title>프로필 정보</Title>

        <PicRow>
          <Subtitle>프로필 사진</Subtitle>
          <PicControl>
            <Avatar size={100} src={myData.profileImageUrl} />
            <Button2 width="100px" height="40px">
              변경
            </Button2>
          </PicControl>
        </PicRow>

        <FormRow>
          <LabelInput label="이름" name="name" data={myData.name} />
          <LabelInput label="닉네임" name="nickname" data={myData.nickname} />
        </FormRow>
      </Section>

      {/* 계정 정보 */}
      <Section>
        <Title>계정 정보</Title>

        <LabelInput label="이메일" name="email" data={myData.email} />

        <PasswordRow>
          <LabelInput label="비밀번호" type="password" name="password" />
          <Button2 width="100px" height="40px">
            변경
          </Button2>
        </PasswordRow>
        <ButtonGroup>
          <Button2 width="180px" height="50px">
            재설정
          </Button2>
          <Button1 width="180px" height="50px">
            변경사항 저장
          </Button1>
        </ButtonGroup>
      </Section>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.div`
  ${FONT.TITLE};
  color: ${MAIN.BLUE};
`;

const Subtitle = styled.div`
  ${FONT.SUBTITLE};
  color: ${TEXT.BLACK};
`;

const PicRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
`;

const PicControl = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const PasswordRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 60px;
  /* background-color : ${GRAY_SCALE.GRAY100}; */
  border-top: 2px solid ${GRAY_SCALE.GRAY300};
  padding: 48px 30px;
`;

export default ProfilePage;
