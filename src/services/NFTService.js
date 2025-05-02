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

//마켓플레이스 NFT 목록 요청
export const getNFTList = async () => {
  const response = await axiosInstance.get(`${API_URL}/listed`)
  return response.data.result;
}


