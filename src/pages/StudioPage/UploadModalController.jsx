import { useEffect, useState } from "react";
import UploadVideoModal1 from "../../components/Modal/UploadVideo/UploadVideoModal1";
import UploadVideoModal2 from "../../components/Modal/UploadVideo/UploadVideoModal2";
import { uploadContent } from "../../utils/upload";
import { postVideoData } from "../../services/videoService";
import { mintVideoNFT } from "../../services/NFTService";
import { getMyInfo } from "../../services/channelService";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout";
import styled from "styled-components";
import Button1 from "../../components/Button/Button1";
import { GRAY_SCALE, TEXT } from "../../constants/colors";

function UploadModalController({ onClose }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //사용자 입력 데이터 - 비디오 정보
  const [videoData, setVideoData] = useState({
    videoTitle: "",
    videoDetail: "",
    videoUrl: "",
    isOpen: true,
    thumbnailUrl: "",
  });

  //사용자 입력 데이터 - NFT 정보
  const [nftData, setNftData] = useState({
    metadataUri: "",
    totalSupply: 1,
    nftName: "",
    nftSymbol: "",
    price: 0,
    videoId: 0,
    creatorAddress: "",
  });

  //NFT 발행 트랜잭션 해시 값
  const [hash, setHash] = useState("");

  //비디오 업르드 단계(1: 기본 정보 및 유사도 검사, 2: NFT 발행)
  const [step, setStep] = useState(1);

  //다음 페이지로 넘어가기
  const handleNext = () => {
    // handleSubmitVideoInfo();
    setStep((prev) => prev + 1);
  };

  //이전 페이지로 돌아가기
  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  //사용자 입력 데이터(비디오 정보) 변경
  const handleChangeVideoInfo = async (e) => {
    const { name, value, files } = e.target;

    let finalValue = value;

    if (name === "videoUrl") {
      console.log("비디오 업로드 시도");
      finalValue = await uploadContent(files[0], "video");
    }

    if (name === "thumbnailUrl") {
      finalValue = files[0];
    }

    if (name === "isOpen") {
      finalValue = value === "true";
    }

    setVideoData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  //사용자 입력 데이터(NFT 정보) 변경
  const handleChangeNFTInfo = (e) => {
    const { name, type, value, files } = e.target;

    let finalValue = value;

    if (name === "price" || name === "totalSupply") {
      finalValue = Number(value);
    }


    setNftData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : finalValue,
    }));
  };

  // 비디오 정보 POST
  const postVideoInfo = async () => {
    try {
      const uploadedImageUrl = await uploadContent(
        videoData.thumbnailUrl,
        "thumbnail"
      );

      const finalVideoData = { ...videoData, thumbnailUrl: uploadedImageUrl };
      const videoId = await postVideoData(finalVideoData);
      setVideoData(finalVideoData);
      console.log("최종 비디오 데이터: ", finalVideoData);
      console.log("비디오 ID: ", videoId);

      const updatedNFTData = { ...nftData, videoId };
      setNftData(updatedNFTData);

      console.log("최종 NFT 데이터: ", updatedNFTData);

      return updatedNFTData;
    } catch (error) {
      console.log(
        "비디오 POST 실패:",
        error.response?.data?.message || "서버 오류"
      );
    }
  };


  // NFT 정보 POST(비디오 업로드 완료)
  const handleSubmit = async () => {
    const finalNFTData = await postVideoInfo();
    try {
      const transactionHash =  await mintVideoNFT(finalNFTData);
      setHash(transactionHash);
      console.log("트랜잭션 Hash: ", transactionHash);
      handleNext();
    } catch (error) {
      console.log("NFT 발행 실패: ", error);
    }
  };

  //temp for test
  useEffect(() => {
    const fetchMyInfo = async () => {
      const myData = await getMyInfo();
      setNftData((prevData) => ({
        ...prevData,
        creatorAddress: myData.walletAddress,
      }));
    };

    fetchMyInfo();
  }, []);

  return (
    <>
      {step === 1 && (
        <UploadVideoModal1
          onCancel={onClose}
          onNext={handleNext}
          onChange={handleChangeVideoInfo}
          data={videoData}
        />
      )}
      {step === 2 && (
        <UploadVideoModal2
          onBack={handleBack}
          onSubmit={handleSubmit}
          onChange={handleChangeNFTInfo}
          data={nftData}
          setNftData={setNftData}
        />
      )}
      {step === 3 && (
        <BasicModalLayout
          footer={
            <Button1 onClick={onClose} width="100px" fontSize="15px">
              완료
            </Button1>
          }
        >
          <CompletionBody>
          <CompletionMessage>
            영상이 등록되었습니다!
            <HashValue>{hash}</HashValue>
          </CompletionMessage>
          <StyledLink>마켓플레이스에 NFT 등록하기</StyledLink>
          </CompletionBody>
        </BasicModalLayout>
      )}
    </>
  );
}

export default UploadModalController;

const CompletionBody = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 30px;
`

const CompletionMessage = styled.div`
font-size: 25px;
font-weight: 550;
`;

const HashValue = styled.div`
  font-size: 13px;
`

const StyledLink = styled.a`
color:${TEXT.GRAY}
`
