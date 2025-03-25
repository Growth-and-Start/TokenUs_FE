import styled from "styled-components";
import { BACKGROUND, MAIN } from "../../constants/colors";

function TextInput ({className, children, type='text', name, onChange, data, height, width }) {

  return(
    <>
    <TextInputWrapper className={className}>
      <Label>{children}</Label>
      <Input
      height={height}
      type={type}
      name={name}
      value={data}
      onChange={onChange}
      />
    </TextInputWrapper>
    </>
  )
}

const TextInputWrapper = styled.div`
display: flex;
flex-direction: column;
`
const Label = styled.label`
font-weight: 520;
font-size: 15px;
padding-bottom: 10px;
`
const Input = styled.input`
height:  ${({ height }) => height || "40px"};
width: ${({width }) => width || "auto"};
border: 1px solid #73798D;
border-radius: 5px;
background-color: ${BACKGROUND.WHITE};
padding: 0 10px;

outline: none; 

&:focus {
  border: 1.5px solid ${MAIN.BLUE};
}
`


export default TextInput;