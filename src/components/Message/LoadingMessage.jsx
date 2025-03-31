import styled from "styled-components";
import {MAIN} from "../../constants/colors";
import { LoadingOutlined } from '@ant-design/icons';

function LoadingMessage({ children, size }) {
  return (
    <>
      <MessageWrapper>
        <Text size={size}>
        <LoadingOutlined style={{ fontSize: size, color: MAIN.BLUE }}/>
          &nbsp;
          {children}
        </Text>
      </MessageWrapper>
    </>
  );
}

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  color: ${MAIN.BLUE};
  margin-right: 5px;
  font-size: ${(props) => props.size};
`;

export default LoadingMessage;
