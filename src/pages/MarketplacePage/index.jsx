import { useEffect, useState } from "react";
import styled from "styled-components";
import { getNFTList } from "../../services/NFTService";
import VideoCard from "../../components/VideoContent/VideoCard";
import { getVideoDetail } from "../../services/videoService";
import { getMyInfo, getUserDetail } from "../../services/channelService";
import { GRAY_SCALE, TEXT } from "../../constants/colors";

function NFTCard({ videoId, creatorId, price, }) {
  const [thumbnail, setThumbnail] = useState("");
  const [channelName, setChannelName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await getVideoDetail(videoId);
        setThumbnail(videoData.thumbnailUrl);
        const userData = await getUserDetail(creatorId);
        setChannelName(userData.nickName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <VideoCardWrapper>
        <Thumbnail thumbnailUrl={thumbnail} />
        <Title>NFT 이름</Title>
        <Channel>{channelName}</Channel>
        <Date>{price} WEI</Date>
      </VideoCardWrapper>
    </>
  );
}

//NFT 마켓플레이스
function MarketplacePage() {
  const [NFTs, setNFTs] = useState([]);
  const [videoData, setVideoData] = useState("");

  //NFT 목록 불러오기
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const data = await getNFTList();
        setNFTs(data);
        console.log("NFT 목록: ", data);
      } catch (error) {
        console.error("NFT 목록 불러오기 실패:", error);
      }
    };
    loadNFTs();
  }, []);

  return (
    <>
      <Wrapper>
        <TempTitle>NFT 마켓플레이스</TempTitle>
        <NFTListWrapper>
          {NFTs.map((nft, index) => (
            <NFTCard
              key={index}
              videoId={nft.videoId}
              creatorId={nft.creatorId}
              price={nft.currentPrice}
            />
          ))}
        </NFTListWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TempTitle = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const NFTListWrapper = styled.div`
  padding: 0 10%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, auto));
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
`;


//Temp
const VideoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  gap: 2px;

  &:hover {
    transform: translateY(-4px) scale(1.00);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
  width: 240px;
  height: 135px;
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
  font-size: 20px;
  padding: 0 5px 5px 0;
  color: ${TEXT.BLACK};
`;


export default MarketplacePage;
