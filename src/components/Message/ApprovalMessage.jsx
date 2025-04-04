import styled from "styled-components";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ApprovalMessage({ children, size }) {
  return (
    <>
      <MessageWrapper>
      <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#00B118" }} />
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
  color: #535761;
  font-size: ${({size}) => size || "12px"};
`;

export default ApprovalMessage;
