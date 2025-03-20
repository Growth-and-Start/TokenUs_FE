import { Avatar } from "antd";
import styled from "styled-components";
import Button1 from "../Button/Button1";
import { GRAY_SCALE, TEXT } from "../../constants/colors";
import FONT from "/Users/kimwonyeong/TokenUs_FE/src/constants/fonts.js";

function ChannelCard({name, account}) {
  return (
    <>
    <ChannelCardWrapper>
      <Avatar size={100}/>
      <InfoWrapper>
        <ChannelName>{name}</ChannelName>
        <ChannelAccount>{account}</ChannelAccount>
      </InfoWrapper>
      <ButtonWrapper>
      <Button1 width="150px" height="40px" fontSize="18px">업로드</Button1>
      </ButtonWrapper>
    </ChannelCardWrapper>
    </>
  )
}

const ChannelCardWrapper = styled.div`
display: flex;
gap:20px;
padding: 20px 10%;
`

const InfoWrapper = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
justify-content: center;
gap:5px;
`

const ChannelName = styled.div`
${FONT.TITLE};
${TEXT.BLACK};
`

const ChannelAccount = styled.div`
${FONT.BODY2};
color: ${GRAY_SCALE.GRAY700};
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

export default ChannelCard;