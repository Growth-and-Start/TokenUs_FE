const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  auth: `${BASE_URL}/auth`,
  user: `${BASE_URL}/user`,
  video: `${BASE_URL}/video`,
  nft: `${BASE_URL}/nft`,
  s3: `${BASE_URL}/s3`,
};