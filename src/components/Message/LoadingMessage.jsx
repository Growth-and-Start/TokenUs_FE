import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import { LoadingOutlined } from "@ant-design/icons";

function LoadingMessage({ children, size }) {
  return (
    <>
      <MessageWrapper>
        <LoadingOutlined style={{ fontSize: size, color: MAIN.BLUE }} />
        <Text size={size}>{children}</Text>
      </MessageWrapper>
    </>
  );
}

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap:8px;
`;

const Text = styled.p`
  color: ${MAIN.BLUE};
  font-size: ${({ size }) => size || "12px"};
`;

export default LoadingMessage;
