import { useState } from "react";
import styled from "styled-components";
import CloseButton from "../../components/Button/CloseButton";
import SignupInput1 from "../../components/Signup/SignupInput1";
import SignupInput2 from "../../components/Signup/SignupInput2";
import SignupComplement from "../../components/Signup/SignupComplement";
import { signup } from "../../services/authService";
import { getPresignedUrl, uploadImageToS3 } from "../../services/uploadService";

function SignupPage() {
  //회원가입 단계
  const [step, setStep] = useState(1);
  //사용자 데이터
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    name: "",
    profileUrl: "",
    walletAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //사용자 데이터 변경
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));

    console.log(formData);

  };

//이미지 업로드 처리
  const handleImageUpload = async () => {
    if (!formData.profileUrl) return null;

    try {
      const file = formData.profileUrl;
      const { uploadURL, key } = await getPresignedUrl(file.name, file.type);
      await uploadImageToS3(uploadURL, file);
      return `https://your-s3-bucket.s3.amazonaws.com/${key}`; // 저장된 이미지 URL 반환
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      setError("이미지 업로드 실패");
      return null;
    }
  };


  //회원가입 데이터 제출 처리
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const uploadedImageUrl = await handleImageUpload(); // 프로필 이미지 업로드
      const finalFormData = { ...formData, profileUrl: uploadedImageUrl };
      console.log(finalFormData);  //temp
      await signup(finalFormData);
      setStep(3); 
    } catch (error) {
      setError("회원가입 실패: " + (error.response?.data?.message || "서버 오류"));
    } finally {
      setLoading(false);
    }
  };


  return (
    <SignupWrapper>
      <SignupBox>
        <CloseButton
          size="2x"
          color="#73798D"
          style={{ position: "absolute", top: "40px", right: "40px" }}
        />
        {step === 1 && <SignupInput1 onClickNext={() => setStep(2)} onChange={handleChange} data={formData} />}
        {step === 2 && <SignupInput2 onClickPrevious={() => setStep(1)} onClickSubmit={handleSubmit} onChange={handleChange} data={formData} />}
        {step === 3 && <SignupComplement />}
        {loading && <p>회원가입 진행 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </SignupBox>
    </SignupWrapper>
  );
}

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const SignupBox = styled.div`
  position: relative;
  width: 25%;
  height: 60vh;
  background-color: #f8f8ff;
  border-radius: 10px;
  border: 1.5px solid #d3d8e5;
  padding: 5%;
`;

export default SignupPage;
