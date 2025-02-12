import styled from "styled-components";

function ImgInput({className, children, type='text', name, onChange, data }) {
  return (
    <>
      <ImgInputWrapper className={className}>
        <Label>{children}</Label>
        <input type={type} name={name} onChange={onChange}/>
      </ImgInputWrapper>
    </>
  );
}

const ImgInputWrapper = styled.div`
display: flex;
flex-direction: column;
`
const Label = styled.label`
font-weight: 520;
font-size: 15px;
padding-bottom: 10px;
`
// const Input = styled.input`
// height: 40px;
// border: 1px solid #73798D;
// border-radius: 5px;
// background-color: #F8F8FF;
// `
export default ImgInput;
