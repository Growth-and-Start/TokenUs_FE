import styled from "styled-components";
import { MAIN, GRAY_SCALE} from "../../constants/colors";
import { useState } from "react";
import FONT from "../../constants/fonts";

function SortBar({sortVideo}) {
  const [selected, setSelected] = useState("최신"); 

  return (
    <BarBody>
      <BarContents>
        <Button active={selected === "최신"} onClick={() => {setSelected("최신"); sortVideo(0)}}>
          최신
        </Button>
        <Divider>|</Divider>
        <Button active={selected === "인기"} onClick={() => {setSelected("인기"); sortVideo(1)}}>
          인기
        </Button>
        <Divider>|</Divider>
        <Button active={selected === "팔로잉"} onClick={() => {setSelected("팔로잉"); sortVideo(2)}}>
          팔로잉
        </Button>
      </BarContents>
    </BarBody>
  );
}

const BarBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #EDF1FE;
  padding: 12px 10%;
`;

const BarContents = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  all: unset;
  color: ${(props) => (props.active ? MAIN.BLUE : GRAY_SCALE.GRAY500)};
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: ${MAIN.BLUE}; /* 파란색으로 변경 */
  }
`;

const Divider = styled.span`
  color: ${GRAY_SCALE.GRAY300};
`;

export default SortBar;
