import Avatar from "../../components/User/Avatar.jsx";
import styled from "styled-components";
import Button1 from "../Button/Button1";
import { GRAY_SCALE, TEXT, WARNING } from "../../constants/colors";
import FONT from "../../constants/fonts.js";
import { Alert, Tooltip } from "antd";

function ChannelCard({ name, account, onClick, profileUrl, wallet }) {
  return (
    <>
      <ChannelCardWrapper>
        <Avatar size={85} src={profileUrl} />
        <InfoWrapper>
          <ChannelName>{name}</ChannelName>
          <ChannelAccount>{account}</ChannelAccount>
        </InfoWrapper>
        <ButtonWrapper>
          <Button1
            onClick={onClick}
            width="150px"
            height="40px"
            fontSize="18px"
            disabled={!wallet}
          >
            업로드
          </Button1>
          {wallet ? null : <AlertMessage>지갑을 연결하세요!</AlertMessage>}
        </ButtonWrapper>
      </ChannelCardWrapper>
    </>
  );
}

const ChannelCardWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px 10%;
`;

const InfoWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const ChannelName = styled.div`
  ${FONT.TITLE};
  ${TEXT.BLACK};
`;

const ChannelAccount = styled.div`
  ${FONT.BODY2};
  color: ${GRAY_SCALE.GRAY700};
`;

const ButtonWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 3px;
`;

const AlertMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: ${GRAY_SCALE.GRAY700};
`

export default ChannelCard;
