import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import ChannelCard from "../../components/VideoContent/ChannelCard";
import VideoCard from "../../components/VideoContent/VideoCard,";
import { GRAY_SCALE } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getSearchResult } from "../../services/videoService";
import { getSearchResult_channel } from "../../services/channelService";

const tempData_channel = [
  {
    name: "크리에이터 연합 토크너스",
    account: "okenus.creator@gamail.com",
  },
  {
    name: "크리에이터 연합 토크너스",
    account: "okenus.creator@gamail.com",
  },
];

const tempData_video = [
  {
    title: "React로 만드는 멋진 웹앱",
    channel: "코딩하는 개발자",
    date: "2024-02-12",
  },
  {
    title: "Styled Components 완벽 가이드",
    channel: "프론트엔드 마스터",
    date: "2024-02-10",
  },
  {
    title: "자바스크립트 최신 문법 정리",
    channel: "TechWorld",
    date: "2024-02-08",
  },
  {
    title: "Next.js로 서버 사이드 렌더링 배우기",
    channel: "웹개발의 모든 것",
    date: "2024-02-05",
  },
  {
    title: "AI 기반 추천 시스템 구현하기",
    channel: "데이터 사이언스 연구소",
    date: "2024-02-03",
  },
  {
    title: "React로 만드는 멋진 웹앱",
    channel: "코딩하는 개발자",
    date: "2024-02-12",
  },
  {
    title: "Styled Components 완벽 가이드",
    channel: "프론트엔드 마스터",
    date: "2024-02-10",
  },
];

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [loading, setLoading] = useState(true);

  //검색 결과 데이터
  const [videoResults, setVideoResults] = useState([]);
  const [channelResults, setChannelResults] = useState([]);

  //검색 결과 데이터 요청
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const videoList = await getSearchResult(query);
        const channelList = await getSearchResult_channel(query);
        setVideoResults(videoList);
        setChannelResults(channelList);
        //temp for test
        console.log("검색 결과(영상): ", videoList);
        console.log("검색 결과(채널): ", channelList);
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
                subscribed={channel.subscribed}
                userId={channel.id}
              />
            </div>
          ))}
        </ChannelListWrapper>
        <ContentListWrapper>
          {videoResults.map((video, index) => (
            <VideoCard
              key={index}
              title={video.videoTitle}
              channel={video.creatorNickname}
              date={video.createdAt}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, auto));
  justify-content: center;
  gap: 25px;
`;

export default SearchResultPage;
