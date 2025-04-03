import styled from "styled-components";
import { GRAY_SCALE, MAIN } from "../../constants/colors";

function VideoInput({ onChange, name }) {
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
  //     onChange({ target: { name: "fileUrl", files: e.dataTransfer.files } });
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  return (
    <InputWrapper>
      <Label htmlFor="videoUpload">
        <strong>파일 선택</strong>
        <SubText>또는 여기로 파일을 끌어오세요</SubText>
      </Label>
      <HiddenInput
        id="videoUpload"
        name={name}
        type="file"
        accept="video/*"
        onChange={onChange}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
box-sizing: border-box;
  border: 1.5px dashed ${GRAY_SCALE.GRAY300};
  border-radius: 10px;
  background-color: #f8f8ff;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${GRAY_SCALE.GRAY100};
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: #535761;
  cursor: pointer;

  strong {
    color: ${GRAY_SCALE.GRAY700};
    text-decoration: underline;
    display: block;
    margin-bottom: 5px;
  }
`;

const SubText = styled.div`
  font-size: 14px;
  color: ${GRAY_SCALE.GRAY400};
`;

const HiddenInput = styled.input`
  display: none;
`;


export default VideoInput;
