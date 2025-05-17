import styled from "styled-components";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout";
import QuantityButton from "../../components/Input/QuantityButton";
import Button1 from "../../components/Button/Button1";
import { useState } from "react";
import { GRAY_SCALE, MAIN } from "../../constants/colors";
import { weiToMatic } from "../../utils/blockchainNetwork";
import { transferVideoNFT } from "../../services/NFTService";
import LoadingMessage from "../../components/Message/LoadingMessage";

function NFTTradeModal({ onClose, listedNFT, setComplete }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  //선택한 NFT 구매하기
  const submitTrade = async (NFTs) => {
    setLoading(true);
    try {
      NFTs.map(async (nft) => {
        await transferVideoNFT(nft.tokenId);
      });
      setLoading(false);
      onClose();
      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 2000);
    } catch (error) {
      console.log("NFT 구매 실패", error);
    }
  };

  return (
    <>
      <BasicModalLayout
        width="32%"
        onClose={onClose}
        header={"NFT 구매하기"}
        footer={
          <SubmitButton>
            {loading ? (
              <LoadingMessage size={14}>잠시만 기다려 주세요...</LoadingMessage>
            ) : (
              <Button1
                onClick={() => submitTrade(listedNFT.slice(0, count))}
                width="150px"
                height="40px"
                fontSize="18px"
              >
                구매하기
              </Button1>
            )}
          </SubmitButton>
        }
      >
        <ModalBody>
          <AmountBox>
            <Title>구매 수량</Title>
            <QuantityButton
              count={count}
              setCount={setCount}
              upperBound={listedNFT.length}
            />
          </AmountBox>
          <NFTBox>
            <Title>구매 NFT</Title>
            <NFTList>
              {listedNFT.slice(0, count).map((nft, index) => (
                <SelectedNFT
                  key={index}
                  name={nft.nftName}
                  id={nft.tokenId}
                  price={nft.currentPrice}
                />
              ))}
            </NFTList>
          </NFTBox>
          <TotalBox>
            <TotalTitle>총 가격</TotalTitle>
            <TotalPrice>
              {listedNFT
                .slice(0, count)
                .reduce(
                  (acc, nft) => acc + Number(weiToMatic(nft.currentPrice)),
                  0
                )
                .toFixed(3)}{" "}
              MATIC
            </TotalPrice>
          </TotalBox>
        </ModalBody>
      </BasicModalLayout>
    </>
  );
}

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-weight: 520;
  font-size: 15px;
`;

const AmountBox = styled.div`
  display: flex;
  gap: 20px;
`;

const NFTBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NFTList = styled.div``;

const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px 0;
  border-top: 1px solid ${GRAY_SCALE.GRAY300};
`;

const TotalTitle = styled.div`
  font-weight: 520;
  font-size: 18px;
`;

const TotalPrice = styled.div`
  font-weight: 520;
  font-size: 18px;
  color: ${MAIN.BLUE};
`;

const SubmitButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function SelectedNFT({ name, id, price }) {
  price = Number(weiToMatic(price)).toFixed(3);
  return (
    <BoxWrapper>
      <NFTName>{name}</NFTName>
      <TokenId>({id})</TokenId>
      <NFTPrice>{price}&nbsp;&nbsp;MATIC</NFTPrice>
    </BoxWrapper>
  );
}

const BoxWrapper = styled.div`
  display: flex;
  gap: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  background-color: white;
  margin-bottom: 5px;
`;
const NFTName = styled.div``;

const TokenId = styled.div`
  color: ${GRAY_SCALE.GRAY500};
`;

const NFTPrice = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
  color: ${MAIN.BLUE};
`;

export default NFTTradeModal;
