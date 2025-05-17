import { useState } from "react";
import styled from "styled-components";
import VideoRow from "../../components/VideoStudio/VideoRow.jsx";
import CheckboxCounter from "../../components/VideoStudio/CheckboxCounter.jsx";
import { GRAY_SCALE, BACKGROUND, TEXT } from "../../constants/colors";
import FONT from "../../constants/fonts.js";

function VideoTable({ videos }) {

  const [selectedIds, setSelectedIds] = useState([]);

  // console.log("선택된 상태:", selectedIds);

  if (!videos || videos.length === 0) {
    return <div>No videos available</div>;
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };
  

  return (
    <div>
      {selectedIds.length > 0 && (
        <CheckboxCounter count={selectedIds.length} />
      )}
    
      <Table>
        {/* 테이블 헤더 */}
        <TableHead>
          <tr>
            <TableHeader style={{ width: '50px' }}>
              {/* 체크박스 스타일링 바꾸기 */}
              <input type="checkbox" checked={false} disabled /> 
            </TableHeader>
            <TableHeader style={{ width: '574px' }}>영상</TableHeader>
            <TableHeader style={{ width: '240px' }}>공개 여부</TableHeader>
            <TableHeader style={{ width: '240px' }}>날짜</TableHeader>
            <TableHeader style={{ width: '240px' }}>NFT 가격</TableHeader>
          </tr>
        </TableHead>

        {/* 테이블 바디 */}
        <TableBody>
          {videos.map(( video = {} ) => (
            video && (
            <VideoRow
              key={video.videoId || Math.random()} 
              video={video}
              isChecked={selectedIds.includes(video.videoId)}
              onCheckboxChange={() => handleCheckboxChange(video.videoId)}
              title={video.videoTitle} 
              summary={video.videoDetail} 
              thumbnail={video.thumbnailUrl}
              isPublic={video.isPublic}
              uploadDate={video.createdAt}
              nftPrice={video.nftPrice}
              videoId={video.videoId}
              creatorId={video.creatorId}
            />
            )
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* 전체 테이블 스타일 */
const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  background-color: ${BACKGROUND.WHITE};
  overflow: hidden;
`;

/* 테이블 헤더 스타일 */
const TableHead = styled.thead`
  background-color: ${GRAY_SCALE.GRAY100};
`;

/* 헤더 셀 스타일 */
const TableHeader = styled.th`
  padding-top: 13px;
  padding-bottom: 13px;
  text-align: center;
  ${FONT.BODY1}
  color: ${TEXT.BLACK};
  border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
  border-right: 1px solid ${GRAY_SCALE.GRAY300};
  &:last-child {
  border-right: none; 
  }
`;

/* 테이블 바디 */
const TableBody = styled.tbody`
  & > tr > td {
    border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
    border-right: 1px solid ${GRAY_SCALE.GRAY300}; 

    &:last-child {
      border-right: none;
    }
  }
`;

export default VideoTable;
