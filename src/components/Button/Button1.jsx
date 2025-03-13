import styled from "styled-components";
import { MAIN, BACKGROUND, GRAY_SCALE } from "../../constants/colors";

function Button1({ children, onClick, width, height, fontSize, disabled }) {
  return (
    <Button onClick={onClick} width={width} height={height} fontSize={fontSize} disabled={disabled}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: ${(props) => props.width || "auto"}; 
  height: ${(props) => props.height || "auto"};
  background-color: ${MAIN.BLUE};
  color:${BACKGROUND.WHITE};
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
    background-color: #265cffb4;
  }
`;

export default Button1;
