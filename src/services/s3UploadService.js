import axios from "axios";

const API_URL = "http://54.180.83.169:8080/s3";

//presigned url 요청
export const getPresignedUrl = async (fileName, contentType) => {
  const response = await axios.get(`${API_URL}/presigned-url`, {
    params: {
      fileName,
      contentType,
    },
  });
  return response.data;
};



//Presigned URL을 사용하여 S3에 이미지 업로드
export const uploadImageToS3 = async (uploadURL, file) => {
  await axios.put(uploadURL, file, {
    headers: { "Content-Type": file.type },
  });
};

