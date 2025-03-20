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


//로그인
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // JWT 쿠키 사용 시 필요
  });

  return response.data;
};