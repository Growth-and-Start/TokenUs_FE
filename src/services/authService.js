import axios from "axios";

const API_URL = "http://54.180.83.169:8080/auth";

//회원가입
export const signup = async (userData) => {
  return await axios.post(`${API_URL}/signup`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

//이메일 중복 체크
export const checkEmail = async (userData) => {
  const response = await axios.post(`${API_URL}/email_check`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response.data.result;
}


//로그인
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 방식 사용 시 필요
  });

  const { accessToken, refreshToken } = response.data.result;

  localStorage.setItem("accessToken", accessToken);

  return accessToken;
};

// 액세스 토큰 재발급 요청
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh`, null, {
      withCredentials: true, 
    });

    const { accessToken } = response.data.result;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패", error);
    throw error;
  }
};