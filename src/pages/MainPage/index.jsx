import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import SortBar from "../../components/VideoContent/SortBar";
import VideoCard from "../../components/VideoContent/VideoCard";
import NFTInfo from "../../components/VideoContent/Main/NFTInfo";
import HolderList from "../../components/VideoContent/Main/HolderList";
import { useEffect, useState } from "react";
import { getVideoList } from "../../services/videoService";
import trendContentThumbnail from "../../assets/KakaoTalk_20250410_011838779.png";
import FONT from "../../constants/fonts";

function MainPage() {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  //비디오 목록 불러오기
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await getVideoList();
        setVideoData(data);
        //temp for test
        // console.log("비디오 목록 불러오기 성공", videoData);
      } catch (error) {
        console.error("비디오 목록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <>
      <MainWrapper>
        {/* 실시간 인기 영상 */}
        <TrendContentWrapper>
          <TrendTitle>실시간 인기 영상</TrendTitle>
          <TrendContent>
            <Thumbnail src={trendContentThumbnail} />
            <HolderList />
            <NFTInfo />
          </TrendContent>
        </TrendContentWrapper>
        <SortBar />
        {/* 비디오 목록 */}
        <ContentListWrapper>
          {videoData.map((video, index) => (
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
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.div`
  padding: 30px 0;
`;

const TrendContentWrapper = styled.div`
  padding: 0 10%;
  margin-bottom: 60px;
`;
const TrendTitle = styled.div`
  color: ${MAIN.BLUE};
  padding: 10px 0;
  ${FONT.TITLE};
`;

const TrendContent = styled.div`
  display: flex;
  gap: 5px;
  height: 250px;
`;

const Thumbnail = styled.img`
  border-radius: 5px;
  width: 444px;
  height: 250px;
  object-fit: cover;
  object-position: center;
`;

/* const ContentListWrapper = styled.div`
padding: 0 10%;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(240px, auto));
justify-content: center;
gap:25px;
margin-top:30px;
` */

const ContentListWrapper = styled.div`
  width: 100%;
  padding: 0 150px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 25px;
  margin-top: 30px;

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

export default MainPage;
