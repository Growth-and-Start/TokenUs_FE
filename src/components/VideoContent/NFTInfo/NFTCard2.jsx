import styled from "styled-components";
import {
  BACKGROUND,
  GRAY_SCALE,
  MAIN,
  SECONDARY,
  WARNING,
} from "../../../constants/colors";
import { weiToMatic } from "../../../utils/blockchainNetwork";

function NFTCard2({
  className,
  videoTitle,
  creator,
  nftName,
  tokenId,
  purchasedPrice,
  floorPrice,
}) {
  //ROI
  let roi;

  if (purchasedPrice === 0) {
    if (floorPrice === 0) {
      roi = 0; 
    } else {
      roi = null; 
    }
  } else {
    roi = ((floorPrice - purchasedPrice) / purchasedPrice) * 100;
  }

  const roiFormatted = Math.abs(roi).toFixed(2);
  const isPositive = roi > 0;
  const isNegative = roi < 0;

  //matic 단위 변환
  purchasedPrice = Number(weiToMatic(purchasedPrice)).toFixed(3);
  floorPrice = Number(weiToMatic(floorPrice)).toFixed(3);

  return (
    <CardWrapper className={className}>
      <InfoSection>
        <VideoInfo>
          <VideoTitle>{videoTitle}</VideoTitle>
          <Creator>{creator}</Creator>
        </VideoInfo>
        <NFTInfo>
          <NFTName>
            {nftName} ({tokenId})
          </NFTName>
        </NFTInfo>
      </InfoSection>
      <PriceSection>
        <Prices>
          <PriceValue>Purchase price: {purchasedPrice}</PriceValue>
          <PriceValue>Floor Price: {floorPrice}</PriceValue>
        </Prices>
        <ROIPercent $up={isPositive} $down={isNegative}>
          {isPositive && "▲ "}
          {isNegative && "▼ "}
          {roiFormatted}%
        </ROIPercent>
      </PriceSection>
    </CardWrapper>
  );
}

export default NFTCard2;

const CardWrapper = styled.div`
  box-sizing: border-box;
  padding: 12px 15px;
  width: 100%;
  border-radius: 15px;
  background: linear-gradient(45deg, #656565 0%, #3c3c3c 40%, #242424 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: space-between;

  &:hover {
    transform: translateY(-4px) scale(1);
    box-shadow: 0 4px 10px ${GRAY_SCALE.GRAY300};
  }
`;

const InfoSection = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
`;

const VideoTitle = styled.div.attrs((props) => ({
  title: props.children,
}))`
  color: ${BACKGROUND.WHITE};
  font-size: 15px;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 최대 2줄
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-height: 1.4; // 줄 간격
  max-height: calc(1.4em * 2); // 두 줄 기준 높이 고정
`;

const Creator = styled.div`
  color: ${BACKGROUND.WHITE};
  font-size: 11px;
`;

const NFTInfo = styled.div``;

const NFTName = styled.div`
  padding: 1px 10px;
  border-radius: 9999px;
  background-color: ${GRAY_SCALE.GRAY900};
  color: ${MAIN.GREEN};
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 25px;
  line-height: 1;
  white-space: nowrap;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Prices = styled.div``;

const PriceValue = styled.div`
  color: ${SECONDARY.GREEN};
  font-size: 12px;
`;

const ROIPercent = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $up, $down }) =>
    $up ? WARNING.TEXT : $down ? "#476bf9" : GRAY_SCALE.GRAY500};
  gap: 5px;
`;
