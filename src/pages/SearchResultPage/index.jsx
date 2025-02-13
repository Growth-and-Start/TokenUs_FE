import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import ChannelCard from "../../components/VideoContent/ChannelCard";
import VideoCard from "../../components/VideoContent/VideoCard,";
import { GRAY_SCALE } from "../../constants/colors";

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
];

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  return (
    <>
      <SearchResultWrapper>
        <Title>{`"${query}"의 검색 결과`}</Title>
        <ChannelListWrapper>
          {tempData_channel.map((channel, index) => (
            <div key={index} style={{borderBottom: `1px solid ${GRAY_SCALE.GRAY300}`}}>
              <ChannelCard name={channel.name} account={channel.account} />
            </div>
          ))}
        </ChannelListWrapper>
        <ContentListWrapper>
          {tempData_video.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              channel={video.channel}
              date={video.date}
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
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export default SearchResultPage;
