import styled from "styled-components";
import { MAIN, GRAY_SCALE } from "../../constants/colors";

function SortBar() {
  return (
    <>
      <BarBody>
        <BarContents>
          <Button>최신</Button>
          <Divider>|</Divider>
          <Button>인기</Button>
          <Divider>|</Divider>
          <Button>팔로잉</Button>
        </BarContents>
      </BarBody>
    </>
  );
}

const BarBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #f2f5fe;
  padding: 10px 10%;
`;

const BarContents = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  all: unset;
  color: ${GRAY_SCALE.GRAY500};
  font-weight: 600;
  font-size: 18px;

  &:hover,
  &:focus {
    color: ${MAIN.BLUE}; /* 파란색으로 변경 */
  }
`;

const Divider = styled.span`
  color: ${GRAY_SCALE.GRAY300};
`;

export default SortBar;
