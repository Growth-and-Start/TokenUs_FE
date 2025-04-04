import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { MAIN, GRAY_SCALE } from "../../constants/colors";
import Video from "../../components/VideoContent/Video";
import Avatar from "../../components/User/Avatar";
import Button1 from "../../components/Button/Button1";
import Button2 from "../../components/Button/Button2";
import VideoDescription from "../../components/VideoContent/VideoDescription";
import LikeButton from "../../components/VideoContent/SocialActions/LikeButton";
import ViewCounter from "../../components/VideoContent/SocialActions/ViewCounter";
import ShareButton from "../../components/VideoContent/SocialActions/ShareButton";
import NFTPrice from "../../components/VideoContent/NFTInfo/NFTPrice";
import NFTHistory from "../../components/VideoContent/NFTInfo/NFTHistory";

//비디오 시청 페이지
function WatchVideoPage() {
  const { videoTitle } = useParams();
  const location = useLocation();
  const { title, channel, formattedDate, videoUrl } = location.state || {};

  const tempData = {
    title: "8시 스쿼시는 즐거워",
    profileUrl: "",
    channelName: "8시 스쿼시 연맹",
    subscribed: false,
    likes: 87,
    views: 256,
    description: "8시 스쿼시 함께 하실래여? 김재열 강사님과 함께합니다.",
    NFTPrice: 0.0027,
    NFThistory: [
      {
        account: "0xa1b2...c3d4",
        price: "0.062",
      },
      {
        account: "0xbeef...feed",
        price: "0.045",
      },
      {
        account: "0xdeed...face",
        price: "0.05",
      },
      {
        account: "0xfade...d00d",
        price: "0.051",
      },
      {
        account: "0xdead...beef",
        price: "0.049",
      },
      {
        account: "0xbaad...cafe",
        price: "0.063",
      },
      {
        account: "0x0ff1...ce00",
        price: "0.051",
      },
      {
        account: "0xc001...d00d",
        price: "0.04",
      },
    ],
  };

  //구독하기
  const handleSubscribe = () => {};

  //구독 취소하기
  const handleUnsubscribe = () => {};

  return (
    <>
      <Wrapper>
        <ContentArea>
          <StyledVideo url={videoUrl} />
          <VideoInfo>
            <VideoTitle>{tempData.title}</VideoTitle>
            <VideoDetail>
              <Channel>
                <Avatar src={tempData.profileUrl} size={45} />
                <ChannelName>{tempData.channelName}</ChannelName>
                <ButtonWrapper>
                  {tempData.subscribed ? (
                    <Button2
                      width="100px"
                      height="40px"
                      fontSize="15px"
                      onClick={handleUnsubscribe}
                    >
                      구독 중
                    </Button2>
                  ) : (
                    <Button1
                      width="100px"
                      height="40px"
                      fontSize="15px"
                      onClick={handleSubscribe}
                    >
                      구독하기
                    </Button1>
                  )}
                </ButtonWrapper>
              </Channel>
              <SocialActions>
                <LikeButton count={170} />
                <ViewCounter count={289} />
                <ShareButton />
              </SocialActions>
            </VideoDetail>
            <VideoDescription>{tempData.description}</VideoDescription>
          </VideoInfo>
        </ContentArea>

        <NFTArea>
          <StyledNFTPrice price={tempData.NFTPrice} />
          <StyledNFTHistory history={tempData.NFThistory} />
        </NFTArea>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px 30px;
`;

const ContentArea = styled.div`
  flex: 2.2;
`;

const NFTArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledVideo = styled(Video)`
  transform: translateY(-4px) scale(1);
  box-shadow:0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const VideoInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VideoTitle = styled.div`
  font-size: 23px;
  font-weight: 500;
`;

const VideoDetail = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const Channel = styled.div`
  display: flex;
  gap: 10px;
`;

const ChannelName = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const SocialActions = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledNFTPrice = styled(NFTPrice)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const StyledNFTHistory = styled(NFTHistory)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

export default WatchVideoPage;
