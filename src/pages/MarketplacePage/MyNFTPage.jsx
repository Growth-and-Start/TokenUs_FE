import { useEffect, useState } from "react";
import { getMyNFT } from "../../services/NFTService";
import styled from "styled-components";
import SortBar2 from "../../components/VideoContent/SortBar2";
import { getNFTList } from "../../services/videoService";
import ListNFTModal from "./ListNFTModal";
import Button1 from "../../components/Button/Button1";

function MyNFTPage() {
  const [NFTs, setNFTs] = useState([]);
  const [selectedNFTs, setSelectedNfts] = useState([]);
  const [isListModalOpen, setIsListModalOpen] = useState(false); //NFT 등록 모달 실행 여부

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
              <button key={index} onClick={() => selectNFT(nft)}>
                <div>{nft.videoTitle}</div>
                <div>{nft.tokenId}</div>
              </button>
            ))}
        </NFTListWrapper>
        <Button1 onClick={openListModal}>임시 모달 버튼</Button1>
      </Wrapper>

      {/*NFT 등록 모달*/}
      {isListModalOpen && (
        <ListNFTModal onClose={closeListModal} selectedNFT={selectedNFTs} />
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

const NFTListWrapper = styled.div``;

export default MyNFTPage;
