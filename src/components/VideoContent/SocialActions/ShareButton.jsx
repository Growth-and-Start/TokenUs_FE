import { ShareAltOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { TEXT, MAIN } from "../../../constants/colors";

function ShareButton() {

//소셜 공유하기
const handleClick = () => {};

  return (
    <Wrapper onClick={handleClick}>
      <StyledIcon />
      <Text>공유하기</Text>
    </Wrapper>
  );
}

const StyledIcon = styled(ShareAltOutlined)`
  font-size: 20px;
  color: ${TEXT.GRAY};
  transition: color 0.2s ease;
`;

const Text = styled.div`
  margin-left: 5px;
  display: flex;
  align-items: center;
  color: ${TEXT.GRAY};
  font-size: 16px;
  transition: color 0.2s ease;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 3px;
  cursor: pointer;

  &:hover ${Text} {
    color: ${MAIN.BLUE}; /* hover 시 텍스트 색 변경 */
  }

  &:hover ${StyledIcon} {
    color: ${MAIN.BLUE}; /* hover 시 아이콘 색 변경 */
  }
`;


export default ShareButton;
