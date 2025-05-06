import styled from "styled-components";
import NFTDesc from "../../components/VideoContent/NFTInfo/NFTDesc";
import { useLocation } from "react-router-dom";
import Button3 from "../../components/Button/Button3";
import defaultThumbnail from "../../assets/default-thumbnail.png";
import Button4 from "../../components/Button/Button4";
import PlusHeart from "../../assets/Vector (3).png";
import NFTHistory from "../../components/VideoContent/NFTInfo/NFTHistory";
import { useEffect, useState } from "react";
import { getVideoDetail } from "../../services/videoService";
import { getUserDetail } from "../../services/channelService";
import { getTxHistory } from "../../services/NFTService";

//NFT 상세 페이지
function NFTDetailPage() {
  const location = useLocation();
  const { videoId, creatorId } = location.state || {};

  const [videoInfo, setVideoInfo] = useState('');
  const [creator, setCreator] = useState('');
  const [txHistory, setTxHistory] = useState();

  const fetchData = async() =>{
    const videoData = await getVideoDetail(videoId);
    setVideoInfo(videoData);
    const creatorData = await getUserDetail(creatorId);
    setCreator(creatorData)
    const txData = await  getTxHistory(videoId);
    setTxHistory(txData);
  }

  useEffect(()=>{
    try{
      fetchData();
    }catch(error){
      console.log("데이터 로드 실패: ", error)
    }
  }, [])

  return (
    <>
      <Wrapper>
        <VideoSection>
          <ImgBox>
            <Thumbnail src={videoInfo.thumbnailUrl} />
          </ImgBox>
          <VideoInfo>
            <StyledNFTDesc 
            title={videoInfo.videoTitle}
            description={videoInfo.videoDetail}
            creator={creator.nickName}
            mintPrice={videoInfo.mintPrice}
            floorPrice={videoInfo.floorPrice}
            profile={creator.profileImageUrl}
            />
            <Buttons>
              <StyledButton4 width="48%" height="50px" fontSize="15px">
                영상 보러가기 ↗
              </StyledButton4>
              <StyledButton3 width="48%" height="50px" fontSize="15px">
                관심 등록 &nbsp; <img src={PlusHeart} width={15} />
              </StyledButton3>
            </Buttons>
          </VideoInfo>
        </VideoSection>
        <NFTSection>
          <TransactionInfo>
            <StyledNFTHistory />
          </TransactionInfo>
          <ListedNFTs></ListedNFTs>
        </NFTSection>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 15px 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VideoSection = styled.div`
  padding: 0 5%;
  display: flex;
  gap: 20px;
`;

const ImgBox = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Thumbnail = styled.img`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 5px;
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const VideoInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledNFTDesc = styled(NFTDesc)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0,0,0,0.05);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton4 = styled(Button4)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0,0,0,0.05);
`

const StyledButton3 = styled(Button3)`
  transform: translateY(-4px) scale(1);
  box-shadow: 0 2px 4px rgb(0,0,0,0.05);
  display: flex;
  align-items: center;
`

const NFTSection = styled.div`
  padding: 0 5%;
  display: flex;
  gap: 20px;
`;

const TransactionInfo = styled.div`
  flex: 2;
`;

const StyledNFTHistory = styled(NFTHistory)`
    transform: translateY(-4px) scale(1);
    box-shadow: 0 2px 4px rgb(0,0,0,0.05);
`

const ListedNFTs = styled.div`
  flex: 3;
  background-color: blueviolet;
`;

export default NFTDetailPage;
