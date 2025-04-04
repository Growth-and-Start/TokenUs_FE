import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import { TEXT } from "../../../constants/colors";
import { useState } from "react";

function LikeButton({ count = 0 }) {
  const [liked, setLiked] = useState(false); // 하트 클릭 여부 상태

  const handleClick = () => {
    setLiked((prev) => !prev); // 클릭하면 토글
  };

  return (
    <Wrapper onClick={handleClick}>
      {liked ? <StyledFilledIcon /> : <StyledOutlinedIcon />}
      <Count>{count}</Count>
      <Text>좋아요</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 3px;
  cursor: pointer;
`;

const StyledOutlinedIcon = styled(HeartOutlined)`
  font-size: 20px;
  color: ${TEXT.GRAY};

  &:hover {
    color: rgba(255, 0, 98, 0.8);
  }
`;

const StyledFilledIcon = styled(HeartFilled)`
  font-size: 20px;
  color: rgba(255, 0, 98, 0.9); /* 하트 클릭된 상태 색상 */
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
