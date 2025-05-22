import styled from "styled-components";
import { GRAY_SCALE, MAIN, TEXT } from "../../constants/colors";
import FONT from "../../constants/fonts.js";
import defaultThumbnail from "../../assets/default-thumbnail.png";
import { Link } from "react-router-dom";
import { weiToMatic } from "../../utils/blockchainNetwork.js";
import { EditOutlined } from "@ant-design/icons";

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
    nftPrice,
    videoId,
    creatorId,
    editVideo,
  } = props;

  //업로드 날짜 데이터 양식 변경
  const [datePart, timePart] = uploadDate.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const formattedDate = `${year} / ${month} / ${day}`;
  const formattedTime = `${hour} : ${minute}`;
  const NFTPrice = nftPrice;
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
        <Link
          to={`/watch/${encodeURIComponent(title)}`}
          state={{
            videoId: videoId,
            creatorId: creatorId,
          }}
        >
          {thumbnail && <Thumbnail thumbnail={thumbnail} />}
        </Link>
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
        {NFTPrice ? NFTPrice : <StyledLink href="">NFT 등록하기</StyledLink>}
      </TableData>
      <TableData>
        <EditIcon
          onClick={() =>
            editVideo({
              videoTitle: title,
              videoDetail: summary,
              isOpen: isPublic=='공개' ? true : false,
              thumbnailUrl: thumbnail,
            })
          }
        />
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
  gap: 30px;
  width: 574px;
  height: 180px;
  padding: 20px 20px;
`;

const Thumbnail = styled.div`
  position: relative;
  background-color: gray;
  background-image: url(${(props) => props.thumbnail});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  width: 250px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); // 처음엔 투명
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3); // hover 시 어둡게
  }
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

  &:hover {
    color: ${MAIN.BLUE};
  }
`;

const EditIcon = styled(EditOutlined)`
  font-size: 20px;
  color: ${GRAY_SCALE.GRAY500};
  cursor: pointer;

  &:hover {
    color: ${MAIN.BLUE};
  }
`;

export default VideoRow;
