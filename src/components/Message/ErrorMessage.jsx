import styled from "styled-components";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ErrorMessage({ children, size }) {
  return (
    <>
      <MessageWrapper>
        <Text size={size}>
          {children}
          &nbsp; 
          <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#E73E3E" }} />
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
  color: #e73e3e;
  margin-right: 5px;
  font-size: ${(props) => props.size};
`;

export default ErrorMessage;
