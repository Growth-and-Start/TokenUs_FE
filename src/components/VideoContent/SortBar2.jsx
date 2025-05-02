import styled from "styled-components";
import { GRAY_SCALE, MAIN, SECONDARY } from "../../constants/colors";
import { useState } from "react";

function SortBar2({sortNFT}) {
  const [selected, setSelected] = useState("latest"); 

  return (
    <BarBody>
      <BarContents>
        <Button active={selected === "latest"} onClick={() => {setSelected("latest"); sortNFT()}}>
          최신
        </Button>

        <Button active={selected === "popular"} onClick={() => {setSelected("popular"); sortNFT("popular")}}>
          인기
        </Button>
  
        <Button active={selected === "liked"} onClick={() => {setSelected("liked"); sortNFT("liked")}}>
          관심
        </Button>
      </BarContents>
    </BarBody>
  );
}


const BarBody = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 0;
`;

const BarContents = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  all: unset;
  padding: 3px 20px;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  border-radius: 9999px;
  color: ${(props) => (props.active ? GRAY_SCALE.GRAY700 : GRAY_SCALE.GRAY500)};
  background-color: ${(props) => (props.active ? SECONDARY.GREEN : "white")};
  font-weight: 550;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: ${GRAY_SCALE.GRAY700}; 
    background-color: ${SECONDARY.GREEN};
  }
`;



export default SortBar2;