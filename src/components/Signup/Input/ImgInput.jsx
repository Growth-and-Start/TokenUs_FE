

import styled from "styled-components";

function ImgInput({ name, onChange, data, children }) {
  return (
    <Wrapper>
      <Left>
        <Label htmlFor={name}>{children}</Label>
        <Input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          onChange={onChange}
        />
      </Left>
      {data && <Preview src={URL.createObjectURL(data)} alt="preview" />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 520;
  font-size: 15px;
  padding-bottom: 5px;
`;

const Input = styled.input``;

const Preview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

export default ImgInput;
