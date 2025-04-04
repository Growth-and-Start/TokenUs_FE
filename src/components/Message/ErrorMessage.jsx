import styled from "styled-components";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ErrorMessage({ children, size }) {
  return (
    <>
      <MessageWrapper>
      <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#E73E3E" }} />
        <Text size={size}>
          {children}
        </Text>
      </MessageWrapper>
    </>
  );
}

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Text = styled.p`
  color: #e73e3e;
  font-size: ${({size}) => size || "12px"};
`;

export default ErrorMessage;
