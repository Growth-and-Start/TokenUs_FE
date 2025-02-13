import { Avatar } from "antd";
import styled from "styled-components";
import Button1 from "../Button/Button1";

function ChannelCard({name, account}) {
  return (
    <>
    <ChannelCardWrapper>
      <Avatar size={70}/>
      <InfoWrapper>
        <ChannelName>{name}</ChannelName>
        <ChannelAccount>{account}</ChannelAccount>
      </InfoWrapper>
      <ButtonWrapper>
      <Button1 width="150px" height="40px" fontSize="18px">구독하기</Button1>
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
font-size: 18px;
`

const ChannelAccount = styled.div`
font-size: 13px;
color: #535761;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

export default ChannelCard;