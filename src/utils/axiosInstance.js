import axios from "axios";
import { refreshAccessToken } from "../services/authService";

const axiosInstance = axios.create({
  baseURL: "http://13.125.207.27:8080",
  withCredentials: true,
});

// 요청 시 accessToken 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 시 accessToken 만료 감지 -> 갱신 후 재시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") // ✅ 이 조건이 핵심
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("리프레시 토큰도 만료됨");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
