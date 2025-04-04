import styled from "styled-components";
import { GRAY_SCALE, TEXT } from "../../constants/colors";

function VideoDescription ({children}) {
  return (
    <>
    <Description>
      {children}
    </Description>
    </>
  )
}

const Description = styled.div`
border-radius: 10px;
border: 1px solid ${GRAY_SCALE.GRAY300};
background-color: ${GRAY_SCALE.GRAY100};
padding: 15px;
font-size: 15px;
color: ${TEXT.GRAY};
`;

export default VideoDescription;