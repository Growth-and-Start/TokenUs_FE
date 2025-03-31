
import styled from "styled-components";
import { GRAY_SCALE } from "../../constants/colors";
import { FaTimes } from "react-icons/fa";

function UploadedFileName({ title, onRemove }) {
  return (
    <Container>
      <VideoTitle title={title}>{title}</VideoTitle>
      <CloseButton onClick={onRemove}>
        <FaTimes size={16} />
      </CloseButton>
    </Container>
  );
}

const Container = styled.div`
box-sizing: border-box;
  width: 100%;
  height: 50px;
  border: 1.5px solid ${GRAY_SCALE.GRAY300};
  border-radius: 8px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8ff;
`;

const VideoTitle = styled.div`
  font-size: 15px;
  color: ${GRAY_SCALE.GRAY700};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CloseButton = styled.div`
  color: ${GRAY_SCALE.GRAY500};
  cursor: pointer;

  &:hover {
    color: ${GRAY_SCALE.GRAY700};
  }
`;

export default UploadedFileName;
