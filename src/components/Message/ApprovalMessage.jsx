import styled from "styled-components";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ApprovalMessage({ children, size }) {
  return (
    <>
      <MessageWrapper>
        <Text size={size}>
          {children}
          &nbsp; 
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#00B118" }} />
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
  color: #535761;
  margin-right: 5px;
  font-size: ${(props) => props.size};
`;

export default ApprovalMessage;
