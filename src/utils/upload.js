import { getPresignedUrl, uploadToS3 } from "../services/s3UploadService";

//파일 업로드 처리 - s3에 업로드후 저장 경로 반환
export const uploadContent = async(file, category) => {
  if(!file) return null;
  try{
    const uploadURL = await getPresignedUrl(category, file.name, file.type);
    console.log("Presigned URL: ", uploadURL)
    return await uploadToS3(uploadURL, file);
  } catch(error){
    console.log("S3 업로드 실패: ", error);
    return null;
  }
}
