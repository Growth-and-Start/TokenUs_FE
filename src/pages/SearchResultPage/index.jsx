import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import ChannelCard from "../../components/VideoContent/ChannelCard";
import VideoCard from "../../components/VideoContent/VideoCard";
import { GRAY_SCALE } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getSearchResult } from "../../services/videoService";
import { getSearchResult_channel } from "../../services/channelService";

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [loading, setLoading] = useState(true);
  const [videoResults, setVideoResults] = useState([]);
  const [channelResults, setChannelResults] = useState([]);

  // 구독 상태 관리
  const [subscribedChannels, setSubscribedChannels] = useState({});

  // 구독 상태 변경 함수
  const toggleSubscription = (channelId) => {
    setSubscribedChannels((prevSubscribed) => ({
      ...prevSubscribed,
      [channelId]: !prevSubscribed[channelId],
    }));
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const videoList = await getSearchResult(query);
        const channelList = await getSearchResult_channel(query);
        
        // 채널 구독 상태 설정 (기존 구독 정보가 있을 경우 상태를 갱신)
        const subscribedChannelIds = {}; // 구독된 채널 ID 목록
        channelList.forEach((channel) => {
          subscribedChannelIds[channel.id] = channel.subscribed; // subscribed 정보로 상태 설정
        });

        
        setVideoResults(videoList);
        setChannelResults(channelList);
        setSubscribedChannels(subscribedChannelIds);
        //temp for test
        console.log("검색 결과: ", videoList, channelList)
      } catch (error) {
        console.log("검색 실패: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <>
      <SearchResultWrapper>
        <Title>{`"${query}"의 검색 결과`}</Title>
        <ChannelListWrapper>
          {channelResults.map((channel, index) => (
            <div
              key={index}
              style={{ borderBottom: `1px solid ${GRAY_SCALE.GRAY300}` }}
            >
              <ChannelCard
                name={channel.nickName}
                account={channel.email}
                profileUrl={channel.profileImageUrl}
                subscribed={subscribedChannels[channel.id] || false}
                userId={channel.id}
                onToggleSubscription={toggleSubscription}
              />
            </div>
          ))}
        </ChannelListWrapper>
        <ContentListWrapper>
          {videoResults.map((video, index) => (
            <VideoCard
            key={index}
            title={video.videoTitle || "제목이 없습니다"}
            channel={video.creatorNickname}
            date={video.createdAt}
            videoId={video.videoId}
            creatorId={video.creatorId}
            thumbnailUrl={video.thumbnailUrl}
            />
          ))}
        </ContentListWrapper>
      </SearchResultWrapper>
    </>
  );
}

const SearchResultWrapper = styled.div`
  padding: 30px 10%;
`;

const Title = styled.div`
  color: ${MAIN.BLUE};
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 50px;
`;

const ChannelListWrapper = styled.div`
  margin-bottom: 40px;
`;

const ContentListWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 25px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export default SearchResultPage;
