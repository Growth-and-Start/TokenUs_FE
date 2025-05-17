import styled from "styled-components";
import { MAIN, GRAY_SCALE, TEXT, BACKGROUND } from "../../../constants/colors";
import QuantityButton from "../../Input/QuantityButton";
import { useEffect, useState } from "react";
import Button1 from "../../Button/Button1";
import Button2 from "../../Button/Button2";
import FONT from "../../../constants/fonts";
import { weiToMatic } from "../../../utils/blockchainNetwork";
import { getUserDetail } from "../../../services/channelService";

function NFTInfo({ video }) {
  const [count, setCount] = useState(1);
  const [creator, setCreator] = useState("");

  const getCreatorName = async () => {
    const data = await getUserDetail(video.creatorId);
    setCreator(data.nickName);
  };

  useEffect(() => {
    getCreatorName();
  }, []);
  return (
    <>
      <NFTInfoWrapper>
        <BasicInfo>
          <VideoTitle>{video.videoTitle}</VideoTitle>
          <Creator>{creator}</Creator>
          {/* <Header>Mint Price</Header>
          <Header>Floor Price</Header>
          <Header>Creator</Header>
          <Data>{weiToMatic(video.mintPrice)}</Data>
          <Data>{weiToMatic(video.floorPrice)}</Data>
          <Data>{creator}</Data> */}
        </BasicInfo>
        <PriceInfo>
          <Title>Floor Price</Title>
          <Price>
            <CurrentPrice>
              {weiToMatic(video.floorPrice) || 0} MATIC
            </CurrentPrice>
            {/* <QuantityButton count={count} setCount={setCount}/> */}
          </Price>
        </PriceInfo>
        <Buttons>
          <Button2 width={"150px"} fontSize={"18px"}>
            NFT 보러가기
          </Button2>
          <Button1 width={"150px"} fontSize={"18px"}>
            구매하기
          </Button1>
        </Buttons>
      </NFTInfoWrapper>
    </>
  );
}

const NFTInfoWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
  width: 35%;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  border-radius: 5px;
  padding: 10px 15px;
`;
const BasicInfo = styled.div`
  /* display: grid;
  grid-template-columns: 1.5fr 1.5fr 2.5fr; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
  padding-bottom: 15px;

`;

const VideoTitle = styled.div.attrs((props) => ({
  title: props.children,
}))`
  color: ${TEXT.BLACK};
  font-size: 20px;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 최대 2줄
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-height: 1.4; // 줄 간격
  max-height: calc(1.4em * 2); // 두 줄 기준 높이 고정
`;

const Creator = styled.div.attrs((props) => ({
  title: props.children,
}))`
  color: ${TEXT.BLACK};
  font-size: 14px;

  display: -webkit-box;
  -webkit-line-clamp: 1; // 최대 2줄
  -webkit-box-orient: vertical;
  overflow: hidden;

  line-height: 1.4; // 줄 간격
  max-height: calc(1.4em * 2); // 두 줄 기준 높이 고정
`;

const Header = styled.div`
  font-size: 15px;
`;

const Data = styled.div`
  color: ${MAIN.BLUE};
  font-size: 15px;
  font-weight: 500;
`;

const PriceInfo = styled.div`
  padding: 0 10px;
`;

const Title = styled.div`
  color: ${GRAY_SCALE.GRAY700};
  ${FONT.CAPTION}
  font-size: 13px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CurrentPrice = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${TEXT.BLACK};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
`;

export default NFTInfo;
