import styled from "styled-components";
import { MAIN } from "../../constants/colors";
import SortBar from "../../components/VideoContent/SortBar";
import VideoCard from "../../components/VideoContent/VideoCard";
import NFTInfo from "../../components/VideoContent/Main/NFTInfo";
import HolderList from "../../components/VideoContent/Main/HolderList";
import { useEffect, useState } from "react";
import { getTopVideo, getVideoList } from "../../services/videoService";
import trendContentThumbnail from "../../assets/KakaoTalk_20250410_011838779.png";
import FONT from "../../constants/fonts";
import { Link } from "react-router-dom";

function MainPage() {
  const [videoData, setVideoData] = useState([]);
  const [topVideo, setTopVideo] = useState();
  const [loading, setLoading] = useState(true);

  //비디오 목록 불러오기
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await getTopVideo();
        setTopVideo(data);
      } catch (error) {
        console.error("실시간 트렌드 동영상 불러오기 실패:", error);
      }
      try {
        const data = await getVideoList();
        setVideoData(data);
      } catch (error) {
        console.error("비디오 목록 불러오기 실패:", error);
      }
    };

    loadVideos();
  }, []);

  //비디오 정렬
  const sortVideo = async (criterion) => {
    try {
      if (criterion == 0) {
        const data = await getVideoList();
        setVideoData(data);
      } else if (criterion == 1) {
        const data = await getVideoList(true, false);
        setVideoData(data);
      } else if (criterion == 2) {
        const data = await getVideoList(false, true);
        setVideoData(data);
      }
    } catch (error) {
      console.error("정렬된 비디오 목록 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainWrapper>
        {/* 실시간 인기 영상 */}
        <TrendContentWrapper>
          <TrendTitle>실시간 인기 영상</TrendTitle>
          {topVideo && (
            <TrendContent>
              <Link
                to={`/watch/${encodeURIComponent(topVideo.videoTitle)}`}
                state={{
                  videoId: topVideo.videoId,
                  creatorId: topVideo.creatorId,
                }}
              >
                <Thumbnail src={topVideo.thumbnailUrl} />
              </Link>
              <HolderList />
              <NFTInfo />
            </TrendContent>
          )}
        </TrendContentWrapper>
        <SortBar sortVideo={sortVideo} />
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

const Thumbnail = styled.div`
  position: relative;
  width: 444px;
  height: 250px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: all 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3); /* hover 시 어둡게 */
  }
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
