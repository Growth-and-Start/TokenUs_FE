import styled from "styled-components";
import { GRAY_SCALE, MAIN, SECONDARY, TEXT } from "../../constants/colors";
import { useState } from "react";

function SortBar2({ menuItems, sort }) {
  const [selected, setSelected] = useState(menuItems[0]?.key || "");

  return (
    <BarBody>
      <BarContents>
        {menuItems.map(({ key, label }) => (
          <Button
            key={key}
            active={selected === key}
            onClick={() => {
              setSelected(key);
              sort(key);
            }}
          >
            {label}
          </Button>
        ))}
      </BarContents>
    </BarBody>
  );
}

const BarBody = styled.div`
  box-sizing: border-box;
  padding: 12px 0;
`;

const BarContents = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  all: unset;
  padding: 3px 20px;
  border: 1px solid ${(props) => (props.active ? GRAY_SCALE.GRAY500 : GRAY_SCALE.GRAY300)};
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
