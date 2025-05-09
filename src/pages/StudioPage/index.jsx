import styled from "styled-components";
import ChannelCard from "../../components/VideoStudio/ChannelCard.jsx";
import VideoTable from "../../components/VideoStudio/VideoTable.jsx";
import { useEffect, useState } from "react";
import UploadModalController from "./UploadModalController.jsx";
import { getMyInfo } from "../../services/channelService.js";
import { getMyVideo } from "../../services/videoService.js";

function StudioPage() {
  //로딩 상태
  const [loading, setLoading] = useState(false);
  //사용자 정보 데이터
  const [userData, setUserData] = useState("");
  //사용자 비디오 데이터
  const [myVideos, setMyVideos] = useState("");

  //비디오 업로드 실행 여부
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  //지갑 연결 상태
  const [isWalletConnedted, setIsWalletConnected] = useState(false);

  //비디오 업로드 모달 창 열고 닫기
  const handleUploadModalOpen = () => setIsUploadModalOpen(true);
  const handleUploadModalClose = () => setIsUploadModalOpen(false);

  //지갑 연결 상태 확인
  const checkWallet = () => {};

  // console.log("channel:", channel);
  // console.log("videos:", tempData_videoTable);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const myData = await getMyInfo();
        setUserData(myData);
        const videoData = await getMyVideo();
        setMyVideos(videoData);
      } catch (error) {
        console.log("사용자 정보 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <StudioPageWrapper>
        <ChannelCardWrapper>
          <ChannelCard
            name={userData.nickname}
            account={userData.email}
            profileUrl={userData.profileImageUrl}
            wallet={userData.walletAddress}
            onClick={handleUploadModalOpen}
          />
        </ChannelCardWrapper>
        <VideoTableWrapper>
          <VideoTable videos={myVideos} />
        </VideoTableWrapper>
      </StudioPageWrapper>

      {/* 비디오 업로드 모달 조건부 렌더링 */}
      {isUploadModalOpen && (
        <UploadModalController onClose={handleUploadModalClose} />
      )}
    </>
  );
}

const StudioPageWrapper = styled.div`
  padding: 30px 10%;
`;

const ChannelCardWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 32px;
`;

const VideoTableWrapper = styled.div`
  overflow-x: auto;
`;

export default StudioPage;
