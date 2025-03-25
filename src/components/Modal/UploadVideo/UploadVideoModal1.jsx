import Button1 from "../../Button/Button1";
import Button2 from "../../Button/Button2";
import RadioInput from "../../Input/RadioInput";
import TextArea from "../../Input/TextArea";
import TextInput from "../../Input/TextInput";
import BasicModalLayout from "../Layout/BasicModalLayout";

function UploadVideoModal1({ onCancel, onNext, onChange, data }) {
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
      <TextInput onChange={onChange} name="title" >제목</TextInput>
      <TextArea height="80px" name="detail">영상 요약</TextArea>
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
    </BasicModalLayout>
  );
}

export default UploadVideoModal1;
