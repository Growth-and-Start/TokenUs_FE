import Button1 from "../../Button/Button1";
import Button2 from "../../Button/Button2";
import ImageInput from "../../Input/ImageInput";
import RadioInput from "../../Input/RadioInput";
import TextArea from "../../Input/TextArea";
import TextInput from "../../Input/TextInput";
import VideoInput from "../../Input/VideoInput";
import BasicModalLayout from "../Layout/BasicModalLayout";
import UploadedFileName from "../../Output/UploadedFileName";

function UploadVideoModal1({ onCancel, onNext, onChange, data, onRemove }) {

  return (
    <BasicModalLayout
      header={"비디오 업로드"}
      footer={
        <>
          <Button2 onClick={onCancel} width="100px" fontSize="15px">
            취소
          </Button2>
          <Button1 onClick={onNext} width="100px" fontSize="15px">
            다음
          </Button1>
        </>
      }
    >
      {/* {data.fileUrl !== "" ?  <VideoInput onChange={onChange}/> : "업로드 완"} */}
      
      
      {data.videoUrl ? (
        <UploadedFileName title={data.videoUrl.name} onRemove={onRemove} />
      ) : (
        <VideoInput onChange={onChange} />
      )}
      
      
      <TextInput onChange={onChange} name="videoTitle" >제목</TextInput>
      <TextArea onChange={onChange} height="80px" name="videoDetail">영상 요약</TextArea>
      <RadioInput
        name="isOpen"
        data={data.isOpen}
        onChange={onChange}
        options={[
          { label: "공개", value:true, description:"해당 영상을 누구나 볼 수 있습니다." },
          { label: "비공개", value: false, description:"해당 영상을 나만 볼 수 있습니다." },
        ]}
      >
        공개 설정
      </RadioInput>
      <ImageInput
      name="thumbnailUrl"
      onChange={onChange}
      data={data.thumbnailUrl}
      >
        썸네일 선택
      </ImageInput>
    </BasicModalLayout>
  );
}

export default UploadVideoModal1;
