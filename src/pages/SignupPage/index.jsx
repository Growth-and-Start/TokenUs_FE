import { useState } from "react";
import SignupInput1 from "../../components/Signup/SignupInput1";
import SignupInput2 from "../../components/Signup/SignupInput2";
import SignupComplement from "../../components/Signup/SignupComplement";
import styled from "styled-components";
import CloseButton from "../../components/Button/CloseButton";

function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nick: "",
    profile: null,
  });

  const handlePrevious = () => {
    setStep(1);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = () => {
    setStep(3);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value, 
    }));
  };

  return (
    <>
      <SignupWrapper>
        <SignupBox>
        <CloseButton
          size="2x"
          color="#73798D"
          style={{ position: "absolute", top: "40px", right: "40px" }}
        />
          {step === 1 && (
            <SignupInput1
              onClickNext={handleNext}
              onChange={handleChange}
              data={formData}
            />
          )}
          {step === 2 && (
            <SignupInput2
              onClickPrevious={handlePrevious}
              onClickSubmit={handleSubmit}
              onChange={handleChange}
              data={formData}
            />
          )}
          {step === 3 && <SignupComplement />}
        </SignupBox>
      </SignupWrapper>
    </>
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
  box-shadow: -2px -2px 20px rgba(240, 238, 238, 0.127),
    2px -2px 20px rgba(240, 238, 238, 0.127),
    -2px 2px 20px rgba(240, 238, 238, 0.127),
    2px 2px 20px rgba(240, 238, 238, 0.127);
`;

export default SignupPage;
