import styled from "styled-components";
import FONT from "../../constants/fonts";
import { MAIN, TEXT, GRAY_SCALE } from "../../constants/colors";
import Avatar from "../../components/User/Avatar.jsx";
import Button2 from "../../components/Button/Button2";
import Button1 from "../../components/Button/Button1";
import TextInput from "../../components/Input/TextInput.jsx";
import { useEffect, useRef, useState } from "react";
import {
  getMyInfo,
  postModifyUserInfo,
} from "../../services/channelService.js";
import { uploadContent } from "../../utils/upload.js";
import LoadingMessage from "../../components/Message/LoadingMessage.jsx";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout.jsx";

const LabelInput = ({ label, name, value, onChange, ...props }) => (
  <InputWrapper>
    <Subtitle>{label}</Subtitle>
    <TextInput name={name} data={value} onChange={onChange} {...props} />
  </InputWrapper>
);

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [myData, setMyData] = useState("");
  const [revise, setRevise] = useState({
    profileImage: null,
    profileImageUrl: "", // 미리보기용
    nickname: "",
  });

  const fileInputRef = useRef(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRevise((prev) => ({
          ...prev,
          profileImage: files[0],
          profileImageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setRevise((prev) => ({ ...prev, [name]: value }));
    }
  };

  //사용자 정보 변경 요청
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadContent(
        revise.profileImage,
        "profile"
      ); // 프로필 이미지 업로드
      const finalFormData = { ...revise, profileImage: uploadedImageUrl };
      console.log("전송 데이터:", finalFormData);
      await postModifyUserInfo(
        finalFormData.profileImage,
        finalFormData.nickname
      );
      setLoading(false);
      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 1000);
    } catch (e) {
      setLoading(false);
      console.log("사용자 정보 수정 실패", e);
    }
  };

  //기존 사용자 정보 가져오기
  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const userData = await getMyInfo();
        setMyData(userData);
        setRevise({
          nickname: userData.nickname,
          profileImageUrl: userData.profileImageUrl,
        });
      } catch (error) {
        console.log("사용자 정보 가져오기 실패: ", error);
      }
    };

    fetchMyData();
  }, []);

  return (
    <PageWrapper>
      {/* 프로필 정보 */}
      <Section>
        <Title>프로필 정보</Title>

        <UserInfoBox>
          <FormRow>
            <LabelInput
              label="닉네임"
              name="nickname"
              type="text"
              value={revise.nickname}
              onChange={handleChange}
            />
          </FormRow>
          <PicRow>
            <Subtitle>프로필 사진</Subtitle>
            <PicControl>
              <ButtonWrapper>
                <label htmlFor="profile-image-upload">
             
                    <StyledAvatar
                      onClick={handleImageButtonClick}
                      size={80}
                      src={revise.profileImageUrl}
                    />
            
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </ButtonWrapper>
            </PicControl>
          </PicRow>
        </UserInfoBox>
      </Section>
      {/* 계정 정보 */}
      <Section>
        <Title>계정 정보</Title>

        <UserInfoBox>
          <LabelInput label="이메일" name="email" data={myData.email} />

          <PasswordRow>
            <LabelInput label="비밀번호" type="password" name="password" />
            <Button2 width="100px" height="40px">
              변경
            </Button2>
          </PasswordRow>
        </UserInfoBox>

        <ButtonGroup>
          {/* <Button2 width="180px" height="50px">
            재설정
          </Button2> */}
          {loading ? (
            <LoadingMessage size={14}>잠시만 기다려 주세요...</LoadingMessage>
          ) : (
            <Button1 onClick={handleSubmit} width="180px" height="50px" fontSize="15px">
              변경사항 저장
            </Button1>
          )}
        </ButtonGroup>
      </Section>
      {/*프로필 정보 수정 완료 알림 모달*/}
      {complete && (
        <BasicModalLayout width="30%">
          <CompletionBody>
            <CompletionMessage>프로필 수정 완료 ✅</CompletionMessage>
          </CompletionBody>
        </BasicModalLayout>
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const UserInfoBox = styled.div`
  display: flex;
  gap: 100px;
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
  gap: 20px;
  margin-top: 8px;
`;


const StyledAvatar = styled(Avatar)`
padding: 2px;
  border: 1.5px solid ${GRAY_SCALE.GRAY700};
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    border-color: ${MAIN.BLUE};
    cursor: pointer;
  }
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

const CompletionBody = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const CompletionMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: 600;
`;

export default ProfilePage;
