import styled from "styled-components";
import { BACKGROUND, MAIN } from "../../constants/colors";

function TextArea ({className, children, type='text', name, onChange, data, height }) {

  return(
    <>
    <TextAreaWrapper className={className}>
      <Label>{children}</Label>
      <Input
      height={height}
      type={type}
      name={name}
      value={data}
      onChange={onChange}
      />
    </TextAreaWrapper>
    </>
  )
}

const TextAreaWrapper = styled.div`
display: flex;
flex-direction: column;
`
const Label = styled.label`
font-weight: 520;
font-size: 15px;
padding-bottom: 10px;
`
const Input = styled.textarea`
height:  ${({ height }) => height || "80px"};;
border: 1px solid #73798D;
border-radius: 5px;
background-color: ${BACKGROUND.WHITE};
padding: 10px;

outline: none; 

&:focus {
  border: 1.5px solid ${MAIN.BLUE}; 
}
`


export default TextArea;