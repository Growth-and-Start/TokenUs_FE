import { Avatar } from "antd";
import styled from "styled-components";
import Button1 from "../Button/Button1";
import Button2 from "../Button/Button2";
import { deleteSubscribe, postSubscribe } from "../../services/channelService";

function ChannelCard({
  name,
  account,
  profileUrl,
  subscribed,
  userId,
  onToggleSubscription, // 상위 컴포넌트에서 전달된 구독 상태 변경 함수
}) {
  // 구독하기
  const handleSubscribe = async () => {
    try {
      await postSubscribe(userId);
      onToggleSubscription(userId); // 구독 상태 변경
    } catch (error) {
      console.error("구독 요청 실패:", error.response?.data || error.message);
    }
  };

  // 구독 취소하기
  const handleUnsubscribe = async () => {
    try {
      await deleteSubscribe(userId);
      onToggleSubscription(userId); // 구독 상태 변경
    } catch (error) {
      console.error("구독 취소 요청 실패:", error.response?.data || error.message);
    }
  };

  return (
    <ChannelCardWrapper>
      <Avatar src={profileUrl} size={70} />
      <InfoWrapper>
        <ChannelName>{name}</ChannelName>
        <ChannelAccount>{account}</ChannelAccount>
      </InfoWrapper>
      <ButtonWrapper>
        {subscribed ? (
          <Button2
            width="150px"
            height="40px"
            fontSize="18px"
            onClick={handleUnsubscribe}
          >
            구독 중
          </Button2>
        ) : (
          <Button1
            width="150px"
            height="40px"
            fontSize="18px"
            onClick={handleSubscribe}
          >
            구독하기
          </Button1>
        )}
      </ButtonWrapper>
    </ChannelCardWrapper>
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
  font-size: 18px;
`;

const ChannelAccount = styled.div`
  font-size: 13px;
  color: #535761;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default ChannelCard;
