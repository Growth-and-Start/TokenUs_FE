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
    withCredentials: true, // JWT 쿠키 사용 시 필요
  });

  return response.data.result.accessToken;
  
};