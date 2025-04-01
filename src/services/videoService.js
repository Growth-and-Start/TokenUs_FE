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
export const checkVideoSimilarity = async (videoUrl) => {

  //temp for test
  console.log("유사도 검사 요청 비디오 URL: ", videoUrl);

  const token = localStorage.getItem("accessToken");
  //temp for test
  console.log("Access Token: ", token);
  if (!token) {
    console.log("로그인이 필요합니다.");
    return;
  }

  return await axios.post(`${API_URL}/similarity_check`, { videoUrl }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

//비디오 목록 요청
export const getVideoList = async (isSubscribe) => {

  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("로그인이 필요합니다.");
    return;
  }

  const response = await axios.get(`${API_URL}/get_opened_videos`, {
    params: { isSubscribe },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //temp for test
  console.log(response);

  return response.data.result;
};
