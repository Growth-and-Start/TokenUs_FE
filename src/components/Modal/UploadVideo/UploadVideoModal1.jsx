import Button1 from "../../Button/Button1";
import Button2 from "../../Button/Button2";
import ImageInput from "../../Input/ImageInput";
import RadioInput from "../../Input/RadioInput";
import TextArea from "../../Input/TextArea";
import TextInput from "../../Input/TextInput";
import VideoInput from "../../Input/VideoInput";
import BasicModalLayout from "../Layout/BasicModalLayout";
import UploadedFileName from "../../Output/UploadedFileName";
import LoadingMessage from "../../Message/LoadingMessage";
import ApprovalMessage from "../../Message/ApprovalMessage";
import ErrorMessage from "../../Message/ErrorMessage";
import { useState, useEffect } from "react";
import { checkVideoSimilarity } from "../../../services/videoService";
import styled from "styled-components";
import { GRAY_SCALE } from "../../../constants/colors";

function UploadVideoModal1({ onCancel, onNext, onChange, data, onRemove }) {
  //업로드한 비디오 이름
  const [videoName, setVideoName] = useState("");

  //유사도 검사 진행 결과
  const [similarityStatus, setSimilarityStatus] = useState("idle"); // "idle" | "loading" | "pass" | "fail" | "error"
  //유사도 검사 결과 (n%)
  const [similarityResult, setSimilarityResult] = useState(null);
  const [maxSimilarity, setMaxSimilarity] = useState(0);
  const [avgSimilarity, setAvgSimilarity] = useState(0);
  //유사도 검사 요청
  useEffect(() => {
    const runSimilarityCheck = async () => {
      if (!data.videoUrl) return;
      setSimilarityStatus("loading");
      const response = await checkVideoSimilarity(data.videoUrl);
      setSimilarityResult(response.data);
      //temp for test
      console.log("유사도 검사 결과", similarityResult);

      //유사도 결과 수치 저장
      setMaxSimilarity(similarityResult.result.max_similarity.toFixed(2));
      setAvgSimilarity(similarityResult.result.avg_similarity.toFixed(2));
      
      //유사한 비디오 경로 저장
      // const similarVideo = "";

      //유사도 검사 결과(통과/실패)에 따라 상태 변경
      if (similarityResult.result.passed) {
        setSimilarityStatus("pass");
      } else {
        setSimilarityStatus("fail");
      }
    };

    runSimilarityCheck();
  }, [data.videoUrl]);

  const removeVideo = () => {
    setVideoName("");
    setSimilarityStatus("idle");
  };

  return (
    <BasicModalLayout
      header={"비디오 업로드"}
      footer={
        <>
          <Button2 onClick={onCancel} width="100px" fontSize="15px">
            취소
          </Button2>
          <Button1
            onClick={onNext}
            width="100px"
            fontSize="15px"
            disabled={
              !(
                similarityStatus === "pass" &&
                data.videoTitle?.trim() !== "" &&
                data.thumbnailUrl
              )
            }
          >
            다음
          </Button1>
        </>
      }
    >
      <div>
        {/* 비디오 업로드 */}
        {videoName ? (
          <UploadedFileName title={videoName} onRemove={removeVideo} />
        ) : (
          <VideoInput
            onChange={(e) => {
              setVideoName(e.target.files[0].name);
              onChange(e);
            }}
            name="videoUrl"
          />
        )}

        {/* 유사도 결과 메세지 */}
        {similarityStatus === "idle" && null}
        {similarityStatus === "loading" && (
          <LoadingMessage size={"13px"}>유사도 검사 진행 중...</LoadingMessage>
        )}
        {similarityStatus === "pass" && (
          <ApprovalMessage size={"13px"}>
            내 영상으로 NFT 발행 가능
          </ApprovalMessage>
        )}
        {similarityStatus === "fail" && (
          <FailMessageBox>
            <ErrorMessage size={"13px"}>
              업로드 불가
            </ErrorMessage>
            <SimilarityValue>
              평균 유사도 : {maxSimilarity} / 최대 유사도 : {avgSimilarity}
            </SimilarityValue>
          </FailMessageBox>
        )}
      </div>
      {/* 기타 다른 영상 정보 입력 */}
      <TextInput onChange={onChange} name="videoTitle" required={true}>
        제목 *
      </TextInput>
      <TextArea onChange={onChange} height="80px" name="videoDetail">
        영상 요약
      </TextArea>
      <RadioInput
        name="isOpen"
        data={data.isOpen}
        onChange={onChange}
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
        공개 설정 *
      </RadioInput>
      <ImageInput
        name="thumbnailUrl"
        onChange={onChange}
        data={data.thumbnailUrl}
      >
        썸네일 선택 *
      </ImageInput>
    </BasicModalLayout>
  );
}

const FailMessageBox = styled.div`
  display: flex;
  text-align: center;
  gap: 10px;
`;

const SimilarityValue = styled.div`
  color: ${GRAY_SCALE.GRAY700};
  font-size: 11px;
  display: flex;
  align-items: center;
`;

export default UploadVideoModal1;
