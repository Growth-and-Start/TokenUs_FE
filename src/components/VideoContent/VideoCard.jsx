import styled from "styled-components";
import { GRAY_SCALE } from "../../constants/colors";
import { Link } from "react-router-dom";

function VideoCard({ title, channel, date, thumbnailUrl, videoId, creatorId }) {
  const [year, month, day] = date.split("T")[0].split("-");
  const formattedDate = `${year} / ${month} / ${day}`;
  return (
    <Link 
    to={`/watch/${encodeURIComponent(title)}`} 
    state={{videoId, creatorId}}
    style={{ textDecoration: "none", color: "inherit" }}>
      <VideoCardWrapper>
        <Thumbnail thumbnailUrl={thumbnailUrl} />
        <Title>{title}</Title>
        <Channel>{channel}</Channel>
        <Date>{formattedDate}</Date>
      </VideoCardWrapper>
    </Link>
  );
}

const VideoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  gap: 2px;
  width : 100%;

  &:hover {
    transform: translateY(-4px) scale(1.00);
    box-shadow: 0 4px 10px ${GRAY_SCALE.GRAY300};
    border-radius: 10px;
  }
`;

const Thumbnail = styled.div`
  position: relative;
  background-color: gray;
  background-image: url(${(props) => props.thumbnailUrl});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); // 처음엔 투명
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3); // hover 시 어둡게
  }
`;

const Title = styled.div`
  font-size: 15px;
  padding: 0 0 0 5px;
`;

const Channel = styled.div`
  padding: 0 0 0 5px;
  font-size: 12px;
  color: ${GRAY_SCALE.GRAY700};
`;

const Date = styled.div`
  display: flex;
  justify-content: end;
  font-size: 12px;
  padding: 0 5px 5px 0;
  color: ${GRAY_SCALE.GRAY700};
`;

export default VideoCard;
