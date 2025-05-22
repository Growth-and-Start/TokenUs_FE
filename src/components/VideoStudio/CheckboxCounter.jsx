import styled from "styled-components";
import { GRAY_SCALE, MAIN } from "../../constants/colors";
import FONT from "../../constants/fonts.js";

function CheckboxCounter({ count }) {
console.log("전달된 count 값:", count); // 상태 값 확인
  return (
    <CounterWrapper>
      <SelectedCount>{count}개 선택됨</SelectedCount>
      <Divider />
      <ModifyButton>선택된 영상 삭제</ModifyButton>
    </CounterWrapper>
  );
}

const CounterWrapper = styled.div`
  display: flex;
  gap: 30px;
  padding: 18px 20px;
  align-items: center;
  background-color: ${GRAY_SCALE.GRAY100};
  border: 1px solid ${MAIN.BLUE};
  border-radius: 5px;
  margin-bottom: 32px;
`;

const SelectedCount = styled.span`
  ${FONT.BODY1};
  color: ${MAIN.BLUE};
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${GRAY_SCALE.GRAY300};
`;

const ModifyButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${GRAY_SCALE.GRAY700};
  ${FONT.BODY2};
  text-decoration: underline;

  &:hover{
    color: ${MAIN.BLUE}
  }
`;

export default CheckboxCounter;
