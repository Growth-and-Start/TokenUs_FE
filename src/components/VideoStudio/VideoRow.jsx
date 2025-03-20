import styled from "styled-components";
import { GRAY_SCALE, TEXT } from "../../constants/colors";
import FONT from "/Users/kimwonyeong/TokenUs_FE/src/constants/fonts.js";
import defaultThumbnail from "/Users/kimwonyeong/TokenUs_FE/src/assets/default-thumbnail.png";

function VideoRow(props) {
  console.log("VideoRow props:", props);

  const { video, isChecked, onCheckboxChange } = props;

  if (!video) {
    return null; // video 값 없으면 렌더링 X
  }

  const {
    thumbnail = defaultThumbnail, // 기본값 설정
    title = "제목 없음",
    summary = "설명 없음",
    isPublic = false,
    uploadDate = "날짜 없음",
    NFTPrice = "0 ETH"
  } = video;

  return (
    <TableRow>
      <CheckBoxCell>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange(video.id)}
        />
      </CheckBoxCell>
      <VideoInfoCell>
        {thumbnail && (
          <Thumbnail src={thumbnail} alt="thumbnail" />
        )}
        <VideoText>
          <Title>{title}</Title>
          <Summary>{summary}</Summary>
        </VideoText>
      </VideoInfoCell>
      <TableData>{isPublic ? "공개" : "비공개"}</TableData>
      <TableData>{uploadDate}</TableData>
      <TableData>{NFTPrice}</TableData>
    </TableRow>
  );
}

const TableRow = styled.tr`
`;

const TableData = styled.td`
  padding: 16px 10px;
  text-align: center;
  ${FONT.BODY2};
  ${TEXT.BLACK};
`;

const CheckBoxCell = styled(TableData)`
  text-align: center;
  
`;

const VideoInfoCell = styled(TableData)`
  display: flex;
  align-items: center;
  text-align: left;
  width: 574px;
  height: 180px;
  padding : 20px;
`;

const Thumbnail = styled.img`
  width: 250px;
  height: 140px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 20px;
`;

const VideoText = styled.div`
  display: flex;
  flex-direction: column;
  gap : 10px;
`;

const Title = styled.h3`
  ${FONT.BODY1};
  ${TEXT.BLACK};
  margin-bottom: 4px;
`;

const Summary = styled.p`
  ${FONT.CAPTION};
  color: ${GRAY_SCALE.GRAY700};
`;

export default VideoRow;