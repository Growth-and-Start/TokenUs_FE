import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";

const API_URL = `${API.user}`;

//검색 결과 요청 (채널 목록)
export const getSearchResult_channel = async (searchFor) => {
  const response = await axiosInstance.get(`${API_URL}/search`, {
    params: { searchFor },
  });

  return response.data.result;
}

//채널 구독 요청
export const postSubscribe = async (targetId) => {
  const response = await axiosInstance.post(`${API_URL}/subscribe?targetId=${targetId}`);

  return response.data.result;
}



//채널 구독 취소 요청
export const deleteSubscribe = async (targetId) => {
  return await axiosInstance.delete(`${API_URL}/unsubscribe`, {
    params: { targetId },
  }
  );
};

//현재 로그인한 사용자의 다른 크리에이터에 대한 정보 요청
export const getUserDetail = async (creatorId) => {
  const response = await axiosInstance.get(`${API_URL}/detail`, {
    params: { creatorId },
  });

  return response.data.result;
}

//현재 로그인한 사용자 정보 요청
export const getMyInfo = async () => {
  const response = await axiosInstance.get(`${API_URL}/get_my_info`)
  return response.data.result;
}

//사용자 지갑 주소 등록
export const postWalletAddress = async (address) => {
  const response = await axiosInstance.post(`${API_URL}/add_wallet`, { address })
  return response.data.result;
}