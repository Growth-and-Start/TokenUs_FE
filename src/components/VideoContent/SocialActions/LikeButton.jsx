import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TEXT } from "../../../constants/colors";

function LikeButton({ count = 0 }) {
  return (
    <>
      <Wrapper>
        <HeartOutlined style={{ fontSize: '20px', color: TEXT.GRAY }} />
        <Count>{count}</Count>
        <Text>좋아요</Text>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
display: flex;
gap: 3px;
`;

const Count = styled.div`
margin-left: 5px;
display: flex;
align-items: center;
color: ${TEXT.GRAY};
font-size: 16px;
`;

const Text = styled.div`
display: flex;
align-items: center;
color: ${TEXT.GRAY};
font-size: 16px;
`;

export default LikeButton;
