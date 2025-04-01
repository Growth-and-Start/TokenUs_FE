import styled from "styled-components";

function VideoCard({ title, channel, date, thumbnailUrl }) {
  const [year, month, day] = date.split("T")[0].split("-");
  const formattedDate = `${year} / ${month} / ${day}`;
  return (
    <VideoCardWrapper>
      <Thumbnail thumbnailUrl={thumbnailUrl} />
      <Title>{title}</Title>
      <Channel>{channel}</Channel>
      <Date>{formattedDate}</Date>
    </VideoCardWrapper>
  );
}

const VideoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 2px;
  padding-bottom: 20px;
`;

const Thumbnail = styled.div`
  background-color: gray;
  background-image: url(${(props) => props.thumbnailUrl});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  width: 240px;
  height: 135px;
`;

const Title = styled.div`
  font-size: 15px;
`;

const Channel = styled.div`
  font-size: 12px;
`;

const Date = styled.div`
  font-size: 12px;
`;

export default VideoCard;
