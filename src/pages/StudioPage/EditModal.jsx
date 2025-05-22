import { useEffect, useState } from "react";
import UploadVideoModal1 from "../../components/Modal/UploadVideo/UploadVideoModal1";
import UploadVideoModal2 from "../../components/Modal/UploadVideo/UploadVideoModal2";
import { uploadContent } from "../../utils/upload";
import { postVideoData } from "../../services/videoService";
import {
  mintVideoNFT,
  registerNFTOnMarketplace,
} from "../../services/NFTService";
import { getMyInfo } from "../../services/channelService";
import BasicModalLayout from "../../components/Modal/Layout/BasicModalLayout";
import styled from "styled-components";
import Button1 from "../../components/Button/Button1";
import { GRAY_SCALE, TEXT } from "../../constants/colors";
import Button2 from "../../components/Button/Button2";
import { maticToWei } from "../../utils/blockchainNetwork";
import { useNavigate } from "react-router-dom";
import ImageInput from "../../components/Input/ImageInput";
import RadioInput from "../../components/Input/RadioInput";
import TextArea from "../../components/Input/TextArea";
import TextInput from "../../components/Input/TextInput";

function EditModal({ onClose, data }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //기존 비디오 정보
  const [videoData, setVideoData] = useState();
  //비디오 정보 수정 데이터
  const [revisedData, setRevisedData] = useState({
    videoTitle: "",
    videoDetail: "",
    isOpen: true,
    thumbnailUrl: "",
  });

  //사용자 입력 데이터(비디오 정보) 변경
  const handleChangeVideoInfo = async (e) => {
    const { name, value, files } = e.target;

    let finalValue = value;

    if (name === "thumbnailUrl") {
      finalValue = files[0];
    }

    if (name === "isOpen") {
      finalValue = value === "true";
    }

    setRevisedData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  //수정된 정보 제출하기
  const handleSubmitData = async(e) => {

  }

  //기존 비디오 정보 불러오기
  const fetchData = () => {
    setRevisedData(data);
    console.log("기존 데이터: ", data);
    console.log("기존 데이터2: ", revisedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BasicModalLayout
        header={"비디오 정보 수정"}
        footer={
          <FooterButtons>
            <Button1 width="100px" fontSize="15px">
              완료
            </Button1>
          </FooterButtons>
        }
        onClose={onClose}
      >
        {/* 기타 다른 영상 정보 입력 */}
        <TextInput
          onChange={handleChangeVideoInfo}
          name="videoTitle"
          data={revisedData.videoTitle}
        >
          제목
        </TextInput>
        <TextArea
          onChange={handleChangeVideoInfo}
          height="80px"
          name="videoDetail"
          data={revisedData.videoDetail}
        >
          영상 요약
        </TextArea>
        <RadioInput
          name="isOpen"
          data={revisedData.isOpen}
          onChange={handleChangeVideoInfo}
          options={[
            {
              label: "공개",
              value: true,
              description: "해당 영상을 누구나 볼 수 있습니다.",
            },
            {
              label: "비공개",
              value: false,
              description: "해당 영상을 나만 볼 수 있습니다.",
            },
          ]}
        >
          공개 설정
        </RadioInput>
        <ImageInput
          name="thumbnailUrl"
          onChange={handleChangeVideoInfo}
          data={revisedData.thumbnailUrl}
        >
          썸네일 선택
        </ImageInput>
      </BasicModalLayout>
    </>
  );
}

const FooterButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 10px;
`;

export default EditModal;
