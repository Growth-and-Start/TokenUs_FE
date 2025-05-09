import styled from "styled-components";
import { MAIN, SECONDARY } from "../../constants/colors";

function QuantityButton({count, setCount,upperBound = Infinity}) {

  const decrease = () => {setCount(count>0? count-1 : count)}
  const increase = () => {setCount(count<upperBound?count+1:count)}

  return (
    <>
      <ButtonWrapper>
        <Button onClick={decrease}>−</Button>
        <Number>{count}</Number>
        <Button onClick={increase}>+</Button>
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Button = styled.div`
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${SECONDARY.BLUE};
  border-radius: 50%;
  color: ${MAIN.BLUE};
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;

  &:hover{
    color: #265cffb4;
    border-color: #265cffb4;
  }
`;

const Number = styled.div`
font-size: 23px;
font-weight: 550;
`

export default QuantityButton;
