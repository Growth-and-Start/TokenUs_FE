import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { API } from "../utils/api";
import { weiToMatic } from "../utils/blockchainNetwork";

const API_URL = `${API.video}`;

//비디오 정보 저장 요청
export const postVideoData = async (data) => {
  const response = await axiosInstance.post(`${API_URL}/save`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.result.id;
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
export const getVideoList = async (popularFilter = false, subscribeFilter = false) => {
  const response = await axiosInstance.get(`${API_URL}/get_opened_videos`, {
    params: { popularFilter, subscribeFilter},
  });

  return response.data.result;
};


//실시간 인기 동영상 요청
export const getTopVideo = async() => {
  const response = await axiosInstance.get(`${API_URL}/most_popular`)

  return response.data.result;
}


//검색 결과 요청 (비디오 목록)
export const getSearchResult = async (searchFor) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { searchFor },
  });

  return response.data.result;
}

//비디오 아이디로 상세 정보 요청
export const getVideoDetail = async (videoId) => {
  const response = await axiosInstance.get(`${API_URL}/detail`, {
    params: { videoId },
  });

  return response.data.result;
};


//영상 좋아요 하기
export const likeVideo = async (videoId) => {
  await axiosInstance.post(`${API_URL}/like?videoId=${videoId}`);
};

//영상 좋아요 취소하기
export const unlikeVideo = async (videoId) => {
  return await axiosInstance.delete(`${API_URL}/unlike`, {
    params: { videoId },
  }
  );
};

//비디오 ID로 해당 비디오 URL 요청(유사도 검사 시 유사한 비디오 반환에 사용)
export const getVideoURL = async (videoId) => {
  const response = await axiosInstance.get(`${API_URL}/get_url`, {
    params: { videoId },
  }
  )
  return response.data.result.videoUrl;
}

//내가 업로드한 비디오 요청
export const getMyVideo = async () => {
  const response = await axiosInstance.get(`${API_URL}/get_my_videos`)
  const result = response.data.result;

  const formattedResult = result.map((video) => ({
    ...video,
    nftPrice: video.nftPrice ? weiToMatic(video.nftPrice) : "",
  }));

  return formattedResult;
}

//마켓플레이스 NFT 목록 요청
export const getNFTList = async (sort) => {
  const response = await axiosInstance.get(`${API_URL}/listed`,{
    params:{sort},
  })
  return response.data.result;
}


//NFT 소유 여부 확인 요청
export const isNFThold = async(videoUrl) => {
  const response = await axiosInstance.get(`${API_URL}/check_nft`,{
    params:{videoUrl},
  })
  return response.data.result;
}

//비디오 정보 수정 요청
export const patchVideoInfo = async(data) => {
  const response = await axiosInstance.patch(`${API_URL}/modify`, data)

  return response.data.result;
}