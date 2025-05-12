import { useEffect, useState } from "react";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout";
import Button1 from "../../components/Button/Button1";
import styled from "styled-components";
import { GRAY_SCALE, MAIN, SECONDARY } from "../../constants/colors";
import { registerNFTOnMarketplace } from "../../services/NFTService";

function ListNFTModal({ onClose, selectedNFT }) {
  const [price, setPrice] = useState(0);

  //선택한 NFT 등록하기
  const submitList = async (NFTs) => {
    try {
      NFTs.map(async (nft) => {
        await registerNFTOnMarketplace(nft.tokenId, price);
        console.log(`NFT 등록: ${nft.tokenId}`)
      });
    } catch (error) {
      console.log("NFT 등록 실패", error);
    }
  };

  //temp
  useEffect(()=>{
    console.log("선택한 NFT", selectedNFT)
  })

  return (
    <>
      <BasicModalLayout
        width="32%"
        onClose={onClose}
        header={"선택한 NFT 등록하기"}
        footer={
          <SubmitButton>
            <Button1
              onClick={()=>submitList(selectedNFT)}
              width="150px"
              height="40px"
              fontSize="18px"
            >
              등록하기
            </Button1>
          </SubmitButton>
        }
      >
        <ModalBody>
          <NFTBox>
            <Label>선택한 NFT</Label>
            <NFTList>

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

const NFTBox = styled.div``;

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

export default ListNFTModal;
