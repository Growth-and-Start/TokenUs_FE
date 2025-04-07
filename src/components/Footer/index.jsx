import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { MAIN, BACKGROUND, GRAY_SCALE, SECONDARY } from "../../constants/colors";
import FONT from "../../constants/fonts";
import logo from "../../assets/logo_icon+text.png";

const FooterWrapper = styled.footer`
  background: ${({ scrollRatio }) => `
    linear-gradient(
      to bottom,
      ${BACKGROUND.WHITE} 0%,
      rgba(210, 216, 245, ${scrollRatio}) 60%,
      rgba(210, 216, 245, ${scrollRatio}) 80%
    )
  `};
  padding: 50px 150px;
  display: flex;
  flex-direction: column;
  transition: background 0.5s ease;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  justify-content: space-between;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  p {
    ${FONT.CAPTION};
    color: ${GRAY_SCALE.GRAY700};
    white-space: pre-line;
  }
`;

const Logo = styled.img`
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: 15px;
`;

const Right = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: inherit;
    text-decoration: none;
    font-size: 24px;
    width: 30px;
    height: 30px;
    background-color: ${BACKGROUND.WHITE};
    border-radius: 50%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: ${SECONDARY.BLUE};
      box-shadow: 1px 1px 5px ${GRAY_SCALE.GRAY300};
    }
  }
`;

const Div = styled.span`
  border-top: 1px dashed;
  color: ${GRAY_SCALE.GRAY500};
  margin-bottom: 25px;
  width: 100%;
`;

const Copyright = styled.div`
  text-align: center;
  ${FONT.CAPTION}
  color: ${GRAY_SCALE.GRAY500};
  margin-bottom: 10px;
`;

const Footer = () => {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      const ratio = Math.min(scrollY / documentHeight, 1);
      setScrollRatio(ratio);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <FooterWrapper scrollRatio={scrollRatio}>
      <Content>
        <Left>
          <Logo src={logo} alt="Tokenus Logo" width="150px" />
          <p>
            NFT와 ResNet-50, FAISS를 활용하여 영상의 무단 복제를 방지하고
            {"\n"}2차 창작 시 원저작자에게 정당한 보상을 제공하는 영상 공유 플랫폼,
            {"\n"}TokenUs
          </p>
        </Left>
        <Right>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="mailto:tokenus27@gmail.com">
            <IoMailOutline />
          </a>
          <a href="https://youtu.be/p3gR0FHNb34?si=jJSId7Qjg-BF73YN" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </Right>
      </Content>
      <Div />
      <Copyright>© 2025 TokenUs. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};

export default Footer;