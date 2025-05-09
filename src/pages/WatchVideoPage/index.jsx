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
import { useEffect, useState } from "react";
import {
  getVideoDetail,
  likeVideo,
  unlikeVideo,
} from "../../services/videoService";
import {
  deleteSubscribe,
  getUserDetail,
  postSubscribe,
} from "../../services/channelService";
import { getTxHistory } from "../../services/NFTService";

//비디오 시청 페이지
function WatchVideoPage() {
  const { videoTitle } = useParams();
  const location = useLocation();
  const { videoId, creatorId } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState("");
  const [channelData, setChannelData] = useState("");
  const [txData, setTxData] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  //구독하기&구독 취소하기
  const toggleSubscription = async () => {
    try {
      if (subscribed === false) {
        await postSubscribe(creatorId);
      } else if (subscribed === true) {
        await deleteSubscribe(creatorId);
      }
      setSubscribed(!subscribed);
    } catch (error) {
      console.log("구독 요청 실패: ", error);
    }
  };

  //좋아요하기&취소하기
  const toggleLike = async () => {
    try {
      if (!liked) {
        await likeVideo(videoId);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      } else {
        await unlikeVideo(videoId);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
      console.log("좋아요 요청 성공!");
    } catch (err) {
      console.error("좋아요 요청 실패:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        console.log("파라미터: ", videoId, creatorId);
        const contentData = await getVideoDetail(videoId);
        const userData = await getUserDetail(creatorId);
        const txData = await getTxHistory(videoId);
        setVideoData(contentData);
        setChannelData(userData);
        setTxData(txData);
        setLiked(contentData.isLiked);
        setLikeCount(contentData.likeCount);
        setSubscribed(userData.subscribed);
      } catch (error) {
        console.error("시청 영상 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <>
      <Wrapper>
        <ContentArea>
          <VideoWrapper>
            <StyledVideo url={videoData.videoUrl} />
          </VideoWrapper>
          <VideoInfo>
            <VideoTitle>{videoData.videoTitle}</VideoTitle>
            <VideoDetail>
              <Channel>
                <Avatar src={channelData.profileImageUrl} size={45} />
                <ChannelName>{channelData.nickName}</ChannelName>
                <ButtonWrapper>
                  {subscribed ? (
                    <Button2
                      width="100px"
                      height="40px"
                      fontSize="15px"
                      onClick={toggleSubscription}
                    >
                      구독 중
                    </Button2>
                  ) : (
                    <Button1
                      width="100px"
                      height="40px"
                      fontSize="15px"
                      onClick={toggleSubscription}
                    >
                      구독하기
                    </Button1>
                  )}
                </ButtonWrapper>
              </Channel>
              <SocialActions>
                <LikeButton
                  count={likeCount}
                  liked={liked}
                  onClick={toggleLike}
                />
                <ViewCounter count={videoData.viewCount} />
                <ShareButton />
              </SocialActions>
            </VideoDetail>
            <VideoDescription>{videoData.videoDetail}</VideoDescription>
          </VideoInfo>
        </ContentArea>

        <NFTArea>
          <StyledNFTPrice price={videoData.floorPrice} />
          <StyledNFTHistory history={txData}/>
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

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
`;

const StyledVideo = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
