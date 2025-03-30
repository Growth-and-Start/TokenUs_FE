import styled from "styled-components";
import { BACKGROUND, MAIN, SECONDARY, GRAY_SCALE } from "../../constants/colors";

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
box-sizing: border-box;
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

&::-webkit-scrollbar {
    width: 8px;
  }

  /* 스크롤바 트랙 (배경) */
  &::-webkit-scrollbar-track {
    width: 20px;
  }

  /* 스크롤바 썸 (움직이는 막대) */
  &::-webkit-scrollbar-thumb {
    background: ${GRAY_SCALE.GRAY300};
    border-radius: 10px;
  }

  /* 스크롤바 썸에 hover 효과 */
  &::-webkit-scrollbar-thumb:hover {
    background: ${SECONDARY.BLUE};;
  }
`


export default TextArea;