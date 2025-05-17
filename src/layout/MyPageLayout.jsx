import { Outlet } from "react-router-dom";
import SideBar from "../components/MyPage/SideBar";
import styled from "styled-components";
import { BACKGROUND, GRAY_SCALE, SECONDARY } from "../constants/colors";

const LayoutWrapper = styled.div`
  display: flex;
  max-width: 100vw;
  min-height: 100vh;
`;

const SidebarWrapper = styled.div`
  margin-left: 0;
  margin-top: 0;
  position: fixed;
  top: 64px;
  left: 0;
  background-color: ${BACKGROUND.WHITE};
`;

const ContentSection = styled.div`
  margin-left: 240px;
  padding: 30px 50px;
  background-color: ${BACKGROUND.WHITE};
  width: calc(100% - 240px);
  min-height: 100vh;
  border-left: 2px ${GRAY_SCALE.GRAY300} solid;
`;

const MyPageLayout = () => {
  return (
    <LayoutWrapper>
      <SidebarWrapper>
        <SideBar />
      </SidebarWrapper>
      <ContentSection>
        <Outlet />
      </ContentSection>
    </LayoutWrapper>
  );
};

export default MyPageLayout;