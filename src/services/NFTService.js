import { API } from "../utils/api";
import axiosInstance from "../utils/axiosInstance"

const API_URL = `${API.nft}`;

//영상 NFT 발행
export const mintVideoNFT = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/mint`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  }
  )

  return response.data;
}

//영상 NFT 거래
export const transferVideoNFT = async (tokenId) => {
  const response = await axiosInstance.post(`${API_URL}/trade`, {tokenId})

  return response.data.result;
}

//마켓플레이스에 NFT 등록
export const registerNFTOnMarketplace = async (tokenId, price) => {
  const response = await axiosInstance.post(`${API_URL}/list`, { tokenId, price })
  return response.data.result;
}


//video id로 NFT 거래 히스토리 요청
export const getTxHistory = async(videoId) => {
  const response = await axiosInstance.get(`${API_URL}/trade_history`,{
    params:{videoId},
  })
  return response.data.result;
}

//video id로 판매 등록된 NFT 목록 요청
export const getListedNFT = async(videoId) => {
  const response = await axiosInstance.get(`${API_URL}/listed`,{
    params:{videoId},
  })
  return response.data.result;
}

//내가 보유한 NFT 요청
export const getMyNFT = async() => {
  const response = await axiosInstance.get(`${API_URL}/my_nft`)
  return response.data.result;
}
