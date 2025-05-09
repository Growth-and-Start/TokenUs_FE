import styled from "styled-components";
import { BACKGROUND, SECONDARY, GRAY_SCALE } from "../../../constants/colors";
import CloseButton from "../../Button/CloseButton";

function BasicModalLayout({ header, children, footer, onClose, width }) {
  return (
    <>
      <Overlay>
        <Container width={width}>
          {onClose && <StyledCloseButton onClick={onClose}     size="2x"
            color={GRAY_SCALE.GRAY500}/>}
          {header && <Header>{header}</Header>}
          <ScrollBody>
            <Body>{children}</Body>
          </ScrollBody>
          {footer && <Footer>{footer}</Footer>}
        </Container>
      </Overlay>
    </>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  background: ${BACKGROUND.WHITE};
  border-radius: 12px;
  padding: 25px 15px 25px 25px;
  width: ${(props) => props.width || '35%'};
  max-width: 90%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollBody = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 13px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  /* 스크롤바 트랙 (배경) */
  &::-webkit-scrollbar-track {
    width: 20px;
  }

  /* 스크롤바 썸 (움직이는 막대) */
  &::-webkit-scrollbar-thumb {
    background: ${GRAY_SCALE.GRAY300};
    border-radius: 10px;
  }

  /* 스크롤바 썸에 hover 효과 */
  &::-webkit-scrollbar-thumb:hover {
    background: ${SECONDARY.BLUE};
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 23px;
  margin: 10px 0 20px 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 20px 0 10px 0;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 30px;
  right: 30px;
`


export default BasicModalLayout;
