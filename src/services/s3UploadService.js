import axios from "axios";

const API_URL = "http://54.180.83.169:8080/s3";

//presigned url 요청
export const getPresignedUrl = async (folder, fileName, contentType) => {
  const response = await axios.get(`${API_URL}/presigned_url`, {
    params: { folder, fileName, contentType },
  });
  return response.data;
};


//Presigned URL을 사용하여 S3에 이미지/비디오 업로드
export const uploadToS3 = async (uploadURL, file) => {
  await axios.put(uploadURL, file, {
    headers: { "Content-Type": file.type },
  });

  return uploadURL.split('?')[0];  //업로드가 완료되면 저장 경로 반환 
};

