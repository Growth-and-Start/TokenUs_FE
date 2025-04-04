import { useState, useEffect } from "react";
import styled from "styled-components";
import CloseButton from "../../components/Button/CloseButton";
import SignupInput1 from "../../components/Signup/SignupInput1";
import SignupInput2 from "../../components/Signup/SignupInput2";
import SignupComplement from "../../components/Signup/SignupComplement";
import { signup } from "../../services/authService";
import { uploadContent } from "../../utils/upload";
import { connectWallet } from "../../utils/blockchainNetwork";

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

  //temp for test
  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  //사용자 데이터 변경
  const handleChange = (e) => {
    setError("");
    const { name, type, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  //지갑 주소 연결
  const handleConnectWallet = async() => {
    const address = await connectWallet();
    setFormData((prevFormData) => ({
      ...prevFormData,
      "walletAddress": address,
    }));
    console.log(formData);
  }

  //회원가입 데이터 제출 처리
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const uploadedImageUrl = await uploadContent(formData.profileUrl, "profile"); // 프로필 이미지 업로드
      const finalFormData = { ...formData, profileUrl: uploadedImageUrl };
      console.log("최종 사용자 데이터: ", finalFormData); //temp
      await signup(finalFormData);
      setStep(3);
    } catch (error) {
      setError(
        "회원가입 실패: " + (error.response?.data?.message || "서버 오류")
      );
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
        {step === 1 && (
          <SignupInput1
            onClickNext={() => setStep(2)}
            onChange={handleChange}
            data={formData}
          />
        )}
        {step === 2 && (
          <SignupInput2
            onClickPrevious={() => setStep(1)}
            onClickSubmit={handleSubmit}
            onChange={handleChange}
            onClick={handleConnectWallet}
            data={formData}
          />
        )}
        {step === 3 && <SignupComplement />}
        {loading && <p>회원가입 진행 중...</p>}
        {step === 2 && error && <p style={{ color: "red" }}>{error}</p>}
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
