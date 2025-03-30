import axios from "axios";

const API_URL = "http://54.180.83.169:8080/video";

//비디오 정보 전송
export const postVideoData = async (data) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("로그인이 필요합니다.");
  }

  return await axios.post(`${API_URL}/save`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


//영상 유사도 검사 결과 요청

