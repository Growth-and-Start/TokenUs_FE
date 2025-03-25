import styled from "styled-components";
import { BACKGROUND } from "../../../constants/colors";

function BasicModalLayout({header, children, footer}) {
  return (
    <>
      <Overlay>
      <Container>
        {header && <Header>{header}</Header>}
        <Body>{children}</Body>
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
  background: ${BACKGROUND.WHITE} ;
  padding: 26px;
  border-radius: 12px;
  width: 32%;
  max-width: 90%;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 23px;
  margin: 10px 0 30px 0;
`;

const Body = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
margin-bottom: 30px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export default BasicModalLayout;
