import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import SortBar from "../../components/VideoContent/SortBar";
import VideoCard from "../../components/VideoContent/VideoCard,";

const tempData = [
  {
    "title": "React로 만드는 멋진 웹앱",
    "channel": "코딩하는 개발자",
    "date": "2024-02-12"
  },
  {
    "title": "Styled Components 완벽 가이드",
    "channel": "프론트엔드 마스터",
    "date": "2024-02-10"
  },
  {
    "title": "자바스크립트 최신 문법 정리",
    "channel": "TechWorld",
    "date": "2024-02-08"
  },
  {
    "title": "Next.js로 서버 사이드 렌더링 배우기",
    "channel": "웹개발의 모든 것",
    "date": "2024-02-05"
  },
  {
    "title": "AI 기반 추천 시스템 구현하기",
    "channel": "데이터 사이언스 연구소",
    "date": "2024-02-03"
  },
  {
    "title": "React로 만드는 멋진 웹앱",
    "channel": "코딩하는 개발자",
    "date": "2024-02-12"
  },
  {
    "title": "Styled Components 완벽 가이드",
    "channel": "프론트엔드 마스터",
    "date": "2024-02-10"
  },
  {
    "title": "자바스크립트 최신 문법 정리",
    "channel": "TechWorld",
    "date": "2024-02-08"
  },
  {
    "title": "Next.js로 서버 사이드 렌더링 배우기",
    "channel": "웹개발의 모든 것",
    "date": "2024-02-05"
  },
  {
    "title": "AI 기반 추천 시스템 구현하기",
    "channel": "데이터 사이언스 연구소",
    "date": "2024-02-03"
  }
]


function MainPage() {
  return (
    <>
    <MainWrapper>
      <TrendContentWrapper>
        <TrendTitle>실시간 인기 영상</TrendTitle>
        <TrendContent>

        </TrendContent>
      </TrendContentWrapper>
      <SortBar/>
      <ContentListWrapper>
      {tempData.map((video, index) => (
        <VideoCard
          key={index}
          title={video.title}
          channel={video.channel}
          date={video.date}
        />
      ))}
      </ContentListWrapper>
    </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
padding: 30px 0;
`

const TrendContentWrapper = styled.div`
padding: 0 10%;
`
const TrendTitle = styled.div`
color: ${MAIN.BLUE};
font-weight: 600;
font-size: 22px;
`

const TrendContent = styled.div``

const ContentListWrapper = styled.div`
display: flex;
gap:20px;
flex-wrap: wrap;
justify-content: center;
padding: 0 10%;
`

export default MainPage;