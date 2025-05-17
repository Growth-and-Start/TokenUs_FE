import { useEffect, useState } from "react";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout";
import Button1 from "../../components/Button/Button1";
import styled from "styled-components";
import { GRAY_SCALE, MAIN, SECONDARY } from "../../constants/colors";
import { registerNFTOnMarketplace } from "../../services/NFTService";
import { weiToMatic } from "../../utils/blockchainNetwork";
import LoadingMessage from "../../components/Message/LoadingMessage";

function ListNFTModal({ onClose, selectedNFT, setComplete }) {
  const [price, setPrice] = useState(0);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //선택한 NFT 등록하기
  const submitList = async (nft) => {
    setLoading(true);
    try {
      await registerNFTOnMarketplace(nft.tokenId, price);
      setLoading(false);
      console.log(`NFT 등록: ${nft.tokenId}`);
      // NFTs.map(async (nft) => {
      //   await registerNFTOnMarketplace(nft.tokenId, price);
      //   console.log(`NFT 등록: ${nft.tokenId}`)
      // });
      onClose();
      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log("NFT 등록 실패", error);
    }
  };

  //temp
  useEffect(() => {
    console.log("선택한 NFT", selectedNFT);
  });

  return (
    <>
      <BasicModalLayout
        width="32%"
        onClose={onClose}
        header={
          selectedNFT.isListed ? "NFT 가격 변경하기" : "선택한 NFT 등록하기"
        }
        footer={
            <SubmitButton>
              {loading ? (
                <LoadingMessage size={14}>
                  잠시만 기다려 주세요...
                </LoadingMessage>
              ) : (
                <Button1
                  onClick={() => submitList(selectedNFT)}
                  width="150px"
                  height="40px"
                  fontSize="18px"
                >
                  등록하기
                </Button1>
              )}
            </SubmitButton>
        }
      >
        <ModalBody>
          <NFTBox>
            <Label>선택한 NFT</Label>
            <NFTList>
              <SelectedNFT
                name={selectedNFT.nftName}
                id={selectedNFT.tokenId}
                price={selectedNFT.floorPrice}
              />
            </NFTList>
          </NFTBox>
          <InputBox>
            <Label>NFT 가격 (MATIC)</Label>
            <InputRow>
              <StyledInput
                type="number"
                step="0.01"
                name="price"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
              />
              <PlusButton
                onClick={() => setPrice((prev) => Number(prev) + 0.01)}
              >
                +
              </PlusButton>
            </InputRow>
          </InputBox>
          {/* {loading ? (
            <LoadingContainer>
              <LoadingMessage size={14}>잠시만 기다려 주세요...</LoadingMessage>
            </LoadingContainer>
          ) : null} */}
        </ModalBody>
      </BasicModalLayout>
    </>
  );
}

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const NFTBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const NFTList = styled.div``;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 520;
  font-size: 15px;
  margin-bottom: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 150px;
  padding: 0 10px;
  border: 1px solid #73798d;
  border-radius: 6px;
  background-color: #f8f8ff;
  font-size: 16px;
`;

const PlusButton = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${SECONDARY.BLUE};
  border-radius: 50%;
  color: ${MAIN.BLUE};
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #265cffb4;
    border-color: #265cffb4;
  }
`;

const SubmitButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${GRAY_SCALE.GRAY300};
  padding-top: 20px;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default ListNFTModal;
