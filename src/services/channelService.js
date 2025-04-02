import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "http://54.180.83.169:8080/user";

//검색 결과 요청 (채널 목록)
export const getSearchResult_channel = async (searchFor) => {
  const response = await axios.get(`${API_URL}/search`, {
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
  return await axiosInstance.delete(`${API_URL}/unsubscribe/${targetId}`);
};