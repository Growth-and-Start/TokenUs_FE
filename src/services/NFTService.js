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

  return response.data.transactionHash;
}

//영상 NFT 거래
export const transferVideoNFT = async (from, to, tokenId) => {
  const response = await axiosInstance.post(`${API_URL}/transfer`, {
    params: {
      from,
      to,
      tokenId,
    },
  }
  )
  return response.data.result;
}