import styled from "styled-components";
import { MAIN, BACKGROUND, GRAY_SCALE, SECONDARY, TEXT } from "../../constants/colors";

function Button4({ className, children, onClick, width, height, fontSize, disabled }) {
  return (
    <Button className={className} onClick={onClick} width={width} height={height} fontSize={fontSize} disabled={disabled}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: ${(props) => props.width || "auto"}; 
  height: ${(props) => props.height || "auto"};
  background-color:white;
  color:${TEXT.BLACK};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: 500;
  font-size: ${(props) => props.fontSize || "auto"};
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled{
    background-color: ${GRAY_SCALE.GRAY300}
  }

  &:hover{
    background-color: #ededed;
    box-shadow : 1px 1px 7px ${GRAY_SCALE.GRAY300};
  }
  
  &:disabled:hover {
    background-color: ${GRAY_SCALE.GRAY300};
  }
`;

export default Button4;
