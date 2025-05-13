import styled from "styled-components";
import defaultThumbnail from "../../../assets/default-thumbnail.png";
import { GRAY_SCALE, MAIN, TEXT } from "../../../constants/colors";
import { weiToMatic } from "../../../utils/blockchainNetwork";
import MaticIcon from "../../../assets/matic.png";
import { useEffect, useState } from "react";
import { getUserDetail } from "../../../services/channelService";
import { getVideoDetail } from "../../../services/videoService";

function NFTCard({ className, title, videoId, creatorId, price }) {
  const [creator, setCreator] = useState(""); //크리에이터 이름(채널명)
  const [imgURL, setImgURL] = useState(""); //썸네일 이미지

  //matic 단위 변환
  const priceToMatic = Number(weiToMatic(price)).toFixed(3);

  //썸네일 이미지 & 크리에이터 이름 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await getVideoDetail(videoId);
        setImgURL(videoData.thumbnailUrl);
        const userData = await getUserDetail(creatorId);
        setCreator(userData.nickName);
      } catch (error) {
        console.log("크리에이터 이름 가져오기 실패", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CardWrapper className={className}>
      <ContentSection>
        <Thumbnail
          src={imgURL || defaultThumbnail}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultThumbnail;
          }}
          alt="thumbnail"
        />
        <TextSection>
          <Title>{title}</Title>
          <Creator>{creator}</Creator>
        </TextSection>
      </ContentSection>
      <BottomSection>
        <Price>
          <PriceIcon src={MaticIcon} />
          {priceToMatic} MATIC
        </Price>
        <InterestButton>+ 관심 등록</InterestButton>
      </BottomSection>
    </CardWrapper>
  );
}

export default NFTCard;

const CardWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 15px;
  background-color: #f8f8f8;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px) scale(1);
    box-shadow: 0 4px 10px ${GRAY_SCALE.GRAY300};
  }
`;

const ContentSection = styled.div`
  box-sizing: border-box;
  padding: 7px;
`;

const Thumbnail = styled.img`
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 5px;
`;

const TextSection = styled.div`
  padding: 15px 10px;
  flex-grow: 1;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${TEXT.BLACK};
  line-height: 1.4;
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Creator = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: ${GRAY_SCALE.GRAY500};
`;

const BottomSection = styled.div`
  height: 25px;
  padding: 12px 16px;
  background: linear-gradient(45deg, #6c6c6c, #343434);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  color: ${MAIN.GREEN};
  font-size: 14px;
  white-space: nowrap; // 한 줄로 유지
  overflow: hidden; // 넘친 부분 숨김
  text-overflow: ellipsis; // 말줄임표 적용
`;

const PriceIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  object-fit: contain;
`;

const InterestButton = styled.div`
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 13px;
  /* text-decoration: underline; */
  &:hover {
    cursor: pointer;
    color: ${MAIN.GREEN};
  }
`;
