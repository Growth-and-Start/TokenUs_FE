import styled from "styled-components";
import { MAIN, BACKGROUND } from "../../constants/colors";

function Button2({ className, children, onClick, width, height }) {
  return (
    <Button className={className} onClick={onClick} width={width} height={height}>
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
  font-weight: 600;
  font-size: 90%;
`;

export default Button2;
