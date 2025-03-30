import styled from "styled-components";
import { GRAY_SCALE, MAIN } from "../../../constants/colors";

function ImgInput({ name, onChange, data, children }) {
  return (
    <Wrapper>
      <Title>{children}</Title>
      <Input>
        <Left>
          <StyledLabel htmlFor={name}>파일 선택</StyledLabel>
          <HiddenInput
            id={name}
            name={name}
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </Left>
        <FileName>{data && data.name}</FileName>
        {data && <Preview src={URL.createObjectURL(data)} alt="preview" />}
      </Input>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 520;
  font-size: 15px;
  padding-bottom: 10px;
`;

const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f5fe;
  color: ${MAIN.BLUE};
  border: 1.5px solid ${GRAY_SCALE.GRAY300};
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #eaf0ff;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileName = styled.div`
color: ${GRAY_SCALE.GRAY500};
font-size: 12px;
max-width: 145px;
word-wrap: break-word;
`;

const Preview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

export default ImgInput;
