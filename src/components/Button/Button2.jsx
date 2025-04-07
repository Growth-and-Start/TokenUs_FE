import styled from "styled-components";
import { MAIN, BACKGROUND } from "../../constants/colors";

function Button2({ className, children, onClick, width, height, fontSize }) {
  return (
    <Button className={className} onClick={onClick} width={width} height={height} fontSize={fontSize}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  background-color: ${BACKGROUND.WHITE};
  color: ${MAIN.BLUE};
  border: 1.5px solid ${MAIN.BLUE};
  border-radius: 8px;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: 500;
  font-size: ${(props) => props.fontSize || "auto"};

  &:hover{
    color: #0049D9;
    border-color: #0049D9;
    box-shadow : 1px 1px 7px #E5E5E5;
  }
`;

export default Button2;
