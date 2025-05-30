import { API } from "../utils/api";
import axiosInstance from "../utils/axiosInstance"
import { maticToWei } from "../utils/blockchainNetwork";
import { ethers, BrowserProvider } from 'ethers';
import marketplaceABI from "../abis/Marketplace_ABI.json";
import videoNFTABI from "../abis/VideoNFT_ABI.json";

const API_URL = `${API.nft}`;

const MARKETPLACE_ADDRESS = '0xc22aff5856cD94C5624f284F151039167a683252';
const VIDEO_NFT_ADDRESS = '0xe27b962A962FE4FFED84525F966C69281e95Ad0d';

// T : 영상 NFT 발행📍
export const mintVideoNFT = async (data, creatorId) => {
  if (!window.ethereum) {
    alert("❗MetaMask가 설치되어 있지 않습니다.");
    return;
  }

  try {
    // 1. 지갑 연결 및 provider/signer 설정
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 2. VideoNFT 컨트랙트 객체 생성
    const videoNFT = new ethers.Contract(
      VIDEO_NFT_ADDRESS,
      videoNFTABI,
      signer
    );

    // 3. NFT 발행 트랜잭션 호출
    const tx = await videoNFT.mintVideoNFT(data.videoId, data.nftName, data.nftSymbol, data.totalSupply, data.price, data.creatorAddress);

    // 4. 트랜잭션 마이닝 대기 후 새로 발행된 토큰 ID들 가져오기기
    const receipt = await tx.wait();

    const mintedTokenIds = [];
    for (let i = 0; i < data.totalSupply; i++) {
      const tokenId = receipt.logs[i].topics[3];
      mintedTokenIds.push(Number(tokenId));
    }

    // 5. 백엔드 API 호출
    await axiosInstance.post(`${API_URL}/mint_result`,
      {
        "totalSupply": data.totalSupply,
        "nftName": data.nftName,
        "nftSymbol": data.nftSymbol,
        "price": data.price,
        "videoId": data.videoId,
        "creatorAddress": data.creatorAddress,
        "creatorId": creatorId,
        "txHash": tx.hash,
        "tokenIdList": mintedTokenIds
      }
    );

    const result = {
      transactionHash: tx.hash,
      blockNumber: tx.blockNumber,
    }
    return result;

  } catch (err) {
    console.error("NFT 발행 실패:", err);
    alert("발행 중 오류 발생");
    return false;
  }
}

// T : 영상 NFT 구매📍
export const transferVideoNFT = async (tokenId, priceInWei) => {
  if (!window.ethereum) {
    alert("❗MetaMask가 설치되어 있지 않습니다.");
    return;
  }

  try {
    console.log("ether.js", ethers)
    // 1. 지갑 연결 및 provider/signer 설정
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();


    // 2. Marketplace 컨트랙트 객체 생성
    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      marketplaceABI,
      signer
    );


    // 3. 구매 트랜잭션 호출 
    const tx = await marketplace.purchaseNFT(tokenId, {
      value: BigInt(priceInWei),
    });


    // 4. 트랜잭션 마이닝 대기
    await tx.wait();

    // 5. 백엔드 API 호출
    await axiosInstance.post(`${API_URL}/trade_result`,
      {
        "tokenId": tokenId,
        "txHash": tx.hash,
        "buyerAddress": signer.address,
        "tradePrice": priceInWei
      }
    )

    return true;
  } catch (err) {
    console.error("NFT 구매 실패:", err);
    alert("구매 중 오류 발생");
    return false;
  }

}

// T : 마켓플레이스에 NFT 등록&취소 📍
export const registerNFTOnMarketplace = async (tokenId, price, userId) => {
  const priceInWei = BigInt(maticToWei(price));

  if (!window.ethereum) {
    alert("❗MetaMask가 설치되어 있지 않습니다.");
    return;
  }

  try {
    // 1. 지갑 연결 및 provider/signer 설정
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 2. Marketplace 컨트랙트 객체 생성
    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      marketplaceABI,
      signer
    );

    // 3. 등록 트랜잭션 호출 
    const tx = await marketplace.listNFT(tokenId, priceInWei);

    // 4. 트랜잭션 마이닝 대기
    await tx.wait();

    // 5. 백엔드 API 호출
    await axiosInstance.post(`${API_URL}/list_result`,
      {
        "tokenId": tokenId,
        "price": priceInWei.toString(),
        "txHash": tx.hash,
        "creatorAddress": signer.address,
        "creatorId": userId
      }
    )

    return true;
  } catch (err) {
    console.error("NFT 등록 실패:", err);
    alert("등록 중 오류 발생");
    return false;
  }

}

export const delistNFTOnMarketplace = async (tokenId, price, userId) => {
  const priceInWei = BigInt(maticToWei(price));

  if (!window.ethereum) {
    alert("❗MetaMask가 설치되어 있지 않습니다.");
    return;
  }

  try {
    // 1. 지갑 연결 및 provider/signer 설정
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // 2. Marketplace 컨트랙트 객체 생성
    const marketplace = new ethers.Contract(
      MARKETPLACE_ADDRESS,
      marketplaceABI,
      signer
    );

    // 3. 등록 취소 트랜잭션 호출 
    const tx = await marketplace.delistNFT(tokenId);

    // 4. 트랜잭션 마이닝 대기
    await tx.wait();

    // 5. 백엔드 API 호출
    await axiosInstance.post(`${API_URL}/delist_result`,
      {
        "tokenId": tokenId,
        "price": priceInWei.toString(),
        "txHash": tx.hash,
        "creatorAddress": signer.address,
        "creatorId": userId
      }
    )

    alert("NFT 등록 취소 완료!");
    return true;
  } catch (err) {
    console.error("NFT 등록 취소 실패:", err);
    alert("등록 취소 중 오류 발생");
    return false;
  }

}


//video id로 NFT 거래 히스토리 요청
export const getTxHistory = async (videoId) => {
  const response = await axiosInstance.get(`${API_URL}/trade_history`, {
    params: { videoId },
  })
  return response.data.result;
}

//video id로 판매 등록된 NFT 목록 요청
export const getListedNFT = async (videoId) => {
  const response = await axiosInstance.get(`${API_URL}/listed`, {
    params: { videoId },
  })
  return response.data.result;
}

//내가 보유한 NFT 요청
export const getMyNFT = async () => {
  const response = await axiosInstance.get(`${API_URL}/my_nft`)
  return response.data.result;
}

//NFT 찜하기&취소
export const saveNFT = async (videoId) => {
  const response = await axiosInstance.post(`${API_URL}/interest?videoId=${videoId}`)
  return response.data.result;
}

export const unsaveNFT = async (videoId) => {
  const response = await axiosInstance.delete(`${API_URL}/interest`, {
    params: { videoId },
  })
  return response.data.result;
}


