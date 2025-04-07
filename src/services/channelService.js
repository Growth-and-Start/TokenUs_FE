import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "http://54.180.83.169:8080/user";

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

//현재 로그인한 사용자의 특정 크리에이터에 대한 정보 요청
export const getUserDetail = async (creatorId) => {
  const response = await axiosInstance.get(`${API_URL}/detail`, {
    params: { creatorId },
  });

  return response.data.result;
}