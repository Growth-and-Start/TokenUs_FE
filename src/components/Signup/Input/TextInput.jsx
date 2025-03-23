import styled from "styled-components";

function TextInput ({className, children, type='text', name, onChange, data }) {

  return(
    <>
    <TextInputWrapper className={className}>
      <Label>{children}</Label>
      <Input
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
height: 40px;
border: 1px solid #73798D;
border-radius: 5px;
background-color: #F8F8FF;
`


export default TextInput;