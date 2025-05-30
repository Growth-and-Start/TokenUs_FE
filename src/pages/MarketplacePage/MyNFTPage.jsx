import { useEffect, useState } from "react";
import { getMyNFT } from "../../services/NFTService";
import styled from "styled-components";
import SortBar2 from "../../components/VideoContent/SortBar2";
import { getNFTList } from "../../services/videoService";
import ListNFTModal from "./ListNFTModal";
import Button1 from "../../components/Button/Button1";
import NFTCard2 from "../../components/VideoContent/NFTInfo/NFTCard2";
import { all } from "axios";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout";

function MyNFTPage() {
  const [NFTs, setNFTs] = useState([]);
  const [selectedNFT, setSelectedNft] = useState();
  const [selectedNFTs, setSelectedNfts] = useState([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false); //NFT 등록 모달 실행 여부
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const fetchData = async () => {
    const nftData = await getMyNFT();
    setNFTs(nftData);
    console.log("내 NFT", nftData);
  };

  //NFT 목록 분류 함수
  const sortNFT = async (criterion) => {
    try {
      let data = await getMyNFT();
      if (criterion == "listed") {
        data = data.filter((nft) => nft.isListed);
      } else if (criterion == "unlisted") {
        data = data.filter((nft) => !nft.isListed);
      }
      setNFTs(data);
      console.log("NFT 목록", data);
    } catch (error) {
      console.error("NFT 목록 불러오기 실패:", error);
    }
  };

  //판매 등록한 NFT 선택/선택 취소 함수
  const selectNFT = (nft) => {
    setSelectedNfts((prev) => {
      const isSelected = prev.find((i) => i.tokenId === nft.tokenId);
      const updated = isSelected
        ? prev.filter((i) => i.tokenId !== nft.tokenId)
        : [...prev, nft];

      console.log("선택한 NFT", updated);
      return updated;
    });
  };

  //NFT 등록 모달 창 열고 닫기
  const openListModal = () => {
    // 상태가 바뀌는 타이밍에 맞춰 한 프레임 뒤 실행
    setTimeout(() => {
      setIsListModalOpen(true);
    }, 0);
  };
  const closeListModal = () => setIsListModalOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Wrapper>
        <PageTitle>내 보유 NFT</PageTitle>
        <NavBox>
          <SortBar2
            sort={sortNFT}
            menuItems={[
              { key: "all", label: "전체" },
              { key: "listed", label: "판매 등록" },
              { key: "unlisted", label: "미등록" },
            ]}
          />
        </NavBox>
        <NFTListWrapper>
          {NFTs &&
            NFTs.map((nft, index) => (
              <button
                key={index}
                style={{ all: "unset" }}
                onClick={() => {
                  setSelectedNft(nft);
                  openListModal();
                }}
              >
                <NFTCard2
                  videoTitle={nft.videoTitle}
                  creator={nft.creatorNickname}
                  nftName={nft.nftName}
                  tokenId={nft.tokenId}
                  purchasedPrice={nft.purchasedPrice}
                  floorPrice={nft.floorPrice}
                />
              </button>

              // <button key={index} onClick={() => selectNFT(nft)}>
              //   <div>{nft.videoTitle}</div>
              //   <div>{nft.tokenId}</div>
              // </button>
            ))}
        </NFTListWrapper>
      </Wrapper>

      {/*NFT 등록 모달*/}
      {isListModalOpen && (
        <ListNFTModal
          onClose={closeListModal}
          selectedNFT={selectedNFT}
          setComplete={setIsCompleteModalOpen}
        />
      )}
      {/* NFT 등록 완료 모달 */}
      {isCompleteModalOpen && (
        <BasicModalLayout
          width="30%"
          onClose={() => setIsCompleteModalOpen(false)}
        >
          <CompletionBody>
            <CompletionMessage>{selectedNFT.isListed ? "변경 완료✅" : "NFT 등록 완료✅"}</CompletionMessage>
            <CompletionMessage2>{selectedNFT.isListed ? 
            `${selectedNFT.nftName}(${selectedNFT.tokenId})의 정보가 성공적으로 변경되었습니다.` 
            : 
            `${selectedNFT.nftName}(${selectedNFT.tokenId})가 마켓플레이스에 성공적으로 등록되었습니다.`}
            </CompletionMessage2>
          </CompletionBody>
        </BasicModalLayout>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding: 50px 10% 0 10%;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.div`
  padding: 30px 0;
  font-size: 25px;
  font-weight: 600;
`;

const NavBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NFTListWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 25px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const CompletionBody = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const CompletionMessage = styled.div`
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: 600;
`;

const CompletionMessage2 = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 13px;
`

export default MyNFTPage;
