import styled from "styled-components";
import ChannelCard from "src/components/VideoStudio/ChannelCard.jsx";
import VideoTable from "src/components/VideoStudio/VideoTable.jsx";

const tempData_channel = {
    name: "크리에이터 연합 토크너스",
    account: "tokenus.creator@gmail.com",
};

const tempData_videoTable = [
  {
    id : 1,
    title: "React로 만드는 멋진 웹앱",
    summary: "React 프레임워크를 활용해 나만의 웹앱 만들기 튜토리얼",
    isPublic: true,
    uploadDate: "2024.02.24",
    NFTPrice: "0.00027ETH",
  },
  {
    id : 2,
    title: "React로 만드는 멋진 웹앱",
    summary: "React 프레임워크를 활용해 나만의 웹앱 만들기 튜토리얼",
    isPublic: false,
    uploadDate: "2024.02.24",
    NFTPrice: "0.00027ETH",
  },
  {
    id : 3,
    title: "React로 만드는 멋진 웹앱",
    summary: "React 프레임워크를 활용해 나만의 웹앱 만들기 튜토리얼",
    isPublic: true,
    uploadDate: "2024.02.24",
    NFTPrice: "0.00027ETH",
  },
  {
    id : 4,
    title: "React로 만드는 멋진 웹앱",
    summary: "React 프레임워크를 활용해 나만의 웹앱 만들기 튜토리얼",
    isPublic: false,
    uploadDate: "2024.02.24",
    NFTPrice: "0.00027ETH",
  }
];

function StudioPage() {
  const channel = tempData_channel; 

  console.log("channel:", channel);
  console.log("videos:", tempData_videoTable);

  if (!channel || !tempData_videoTable) {
    return <div>Loading...</div>; // 값 없으면 로딩 처리
  };

  return (
    <>
      <StudioPageWrapper>
        <ChannelCardWrapper>
          <ChannelCard name={channel.name} account={channel.account} />
        </ChannelCardWrapper>
        <VideoTableWrapper>
          <VideoTable videos={tempData_videoTable} />
        </VideoTableWrapper>
      </StudioPageWrapper>
    </>
  );
}

const StudioPageWrapper = styled.div`
  padding: 48px 0;
`;

const ChannelCardWrapper= styled.div`
  margin-bottom: 32px;
`;

const VideoTableWrapper = styled.div`
  margin : 48px;
  overflow-x: auto;
`;

export default StudioPage;