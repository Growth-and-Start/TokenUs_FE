import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import { TEXT } from "../../../constants/colors";

function LikeButton({ count=0, liked, onClick}) {

  return (
    <Wrapper>
      {liked ? <StyledFilledIcon onClick={onClick}/> : <StyledOutlinedIcon onClick={onClick}/>}
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
