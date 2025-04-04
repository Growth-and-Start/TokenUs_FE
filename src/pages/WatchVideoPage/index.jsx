import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

//비디오 시청 페이지
function WatchVideoPage() {
  const { videoTitle } = useParams();
  const location = useLocation();
  const { title, channel, formattedDate, videoUrl } = location.state || {};

  return (
    <>
      <Wrapper>
        <ContentArea>
          <StyledVideo controls width="60%" src={videoUrl} />
          <VideoInfo></VideoInfo>
        </ContentArea>
        <NFTArea></NFTArea>

        <h2>{title}</h2>
        <p>
          {channel} | {formattedDate}
        </p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentArea = styled.div``;

const NFTArea = styled.div``;

const StyledVideo = styled.video`
  border-radius: 10px;
`;

const VideoInfo = styled.div``;




export default WatchVideoPage;
