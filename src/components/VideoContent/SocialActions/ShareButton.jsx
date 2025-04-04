import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TEXT } from "../../../constants/colors";

function ShareButton() {
  return (
    <>
      <Wrapper>
        <ShareAltOutlined style={{ fontSize: "20px", color: TEXT.GRAY }} />
        <Text>공유하기</Text>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 3px;
`;

const Text = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
  color: ${TEXT.GRAY};
  font-size: 16px;
`;

export default ShareButton;
