import styled from "styled-components";

function VideoCard({title, channel, date}) {
  return(
    <>
    <VideoCardWrapper>
      <Thumbnail/>
      <Title>{title}</Title>
      <Channel>{channel}</Channel>
      <Date>{date}</Date>
    </VideoCardWrapper>
    </>
  )
}

const VideoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width:250px;
  gap:2px;
  padding-bottom: 20px;
`

const Thumbnail = styled.div`
background-color: gray;
border-radius: 5px;
width: 100%;
height: 140px;
`

const Title = styled.div`
font-size: 15px;
`

const Channel = styled.div`
font-size: 12px;
`

const Date = styled.div`
font-size: 12px
`

export default VideoCard;