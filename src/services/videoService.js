import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "http://54.180.83.169:8080/video";

//비디오 정보 저장 요청
export const postVideoData = async (data) => {
  return await axiosInstance.post(`${API_URL}/save`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};


//영상 유사도 검사 요청
export const checkVideoSimilarity = async (videoUrl) => {
  console.log("유사도 검사 요청 비디오 URL: ", videoUrl);

  return await axiosInstance.post(`${API_URL}/similarity_check`, { videoUrl }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 비디오 목록 요청
export const getVideoList = async (isSubscribe) => {
  const response = await axiosInstance.get(`${API_URL}/get_opened_videos`, {
    params: { isSubscribe },
  });

  return response.data.result;
};


//검색 결과 요청 (비디오 목록)
export const getSearchResult = async (searchFor) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {searchFor},
  });

  return response.data.result;
}