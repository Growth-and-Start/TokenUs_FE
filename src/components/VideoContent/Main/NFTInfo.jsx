import styled from "styled-components";
import { MAIN, GRAY_SCALE, TEXT } from "../../../constants/colors";
import QuantityButton from "../../Input/QuantityButton";
import { useState } from "react";
import Button1 from "../../Button/Button1";
import Button2 from "../../Button/Button2";
import FONT from "../../../constants/fonts";

function NFTInfo() {
  const [count, setCount] = useState(1);
  const TotalPrice = 0.0027;
  return (
    <>
      <NFTInfoWrapper>
        <BasicInfo>
          <Header>Mint Price</Header>
          <Header>Floor Price</Header>
          <Header>Creator</Header>
          <Data>$0.0002</Data>
          <Data>$0.0027</Data>
          <Data>크리에이터 연합 토크너스</Data>
        </BasicInfo>
        <PriceInfo>
          <Title>예상 가격</Title>
          <Price>
            <CurrentPrice>{TotalPrice * count} ETH</CurrentPrice>
            <QuantityButton count={count} setCount={setCount}/>
          </Price>
        </PriceInfo>
        <Buttons>
          <Button2 width={'150px'} fontSize={'18px'}>NFT 보러가기</Button2>
          <Button1 width={'150px'} fontSize={'18px'}>구매하기</Button1>
        </Buttons>
      </NFTInfoWrapper>
    </>
  );
}

const NFTInfoWrapper = styled.div`
  width: 35%;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  border-radius: 5px;
  padding: 10px 15px;
`;
const BasicInfo = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 2.5fr;
  gap: 10px;
  border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
  padding-bottom: 15px;
  margin-bottom: 20px;
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
margin-bottom: 30px;
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
${FONT.TITLE};
color : ${TEXT.BLACK};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap:20px;
`

export default NFTInfo;
