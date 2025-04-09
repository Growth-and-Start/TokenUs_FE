import styled from "styled-components";
import { GRAY_SCALE, MAIN, TEXT } from "../../constants/colors";
import FONT from "../../constants/fonts.js";
import defaultThumbnail from "../../assets/default-thumbnail.png";

function VideoRow(props) {
  // console.log("VideoRow props:", props);

  const {
    video,
    isChecked,
    onCheckboxChange,
    title,
    summary,
    thumbnail,
    isPublic = "공개",
    uploadDate,
    NFTPrice,
  } = props;

  //업로드 날짜 데이터 양식 변경
  const [datePart, timePart] = uploadDate.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const formattedDate = `${year} / ${month} / ${day}`;
  const formattedTime = `${hour} : ${minute}`;
  return (
    <TableRow>
      <CheckBoxCell>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange(video.videoId)}
        />
      </CheckBoxCell>
      <VideoInfoCell>
        {thumbnail && <Thumbnail src={thumbnail} alt="thumbnail" />}
        <VideoText>
          <Title>{title}</Title>
          <Summary>{summary}</Summary>
        </VideoText>
      </VideoInfoCell>
      <TableData>{isPublic ? "공개" : "비공개"}</TableData>
      <TableData>
        {formattedDate}
        <br />
        {formattedTime}
      </TableData>
      <TableData>
        {NFTPrice ? 
        NFTPrice 
        : (
          <StyledLink href="">NFT 등록하기</StyledLink>
        )
        }
        </TableData>
    </TableRow>
  );
}

const TableRow = styled.tr``;

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
box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: left;
  gap:30px;
  width: 574px;
  height: 180px;
  padding: 20px 20px;
`;

const Thumbnail = styled.img`
  width: 250px;
  height: 140px;
  border-radius: 5px;
  object-fit: cover;
`;

const VideoText = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  ${FONT.BODY1};
  ${TEXT.BLACK};
`;

const Summary = styled.div`
  ${FONT.CAPTION};
  color: ${GRAY_SCALE.GRAY700};
  font-size: 13px;

  overflow: hidden; 
  text-overflow: ellipsis;
  max-width: 100%; 

  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const StyledLink = styled.a`
all: unset;
text-decoration: underline;
color: ${GRAY_SCALE.GRAY700};
font-size: 14px;

&:hover{
  color: ${MAIN.BLUE}
}
`

export default VideoRow;
