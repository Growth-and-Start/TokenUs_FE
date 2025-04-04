import { Outlet } from "react-router-dom";
import SideBar from "../components/MyPage/SideBar";
import styled from "styled-components";
import { BACKGROUND, SECONDARY } from "../constants/colors";

const LayoutWrapper = styled.div`
  display: flex;
  width: 100vw;
`;

const SidebarWrapper = styled.div`
  margin-left: 48px;
  margin-top: 60px;
  position: fixed;
  top: 64px;
  left: 0;
  background-color: ${BACKGROUND.WHITE};
`;

const ContentSection = styled.div`
  margin-left: 258px;
  margin-top: 60px;
  padding: 24px 48px;
  background-color: ${BACKGROUND.WHITE};
  width: calc(100% - 258px);
  min-height: 100vh;
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