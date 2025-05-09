import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";

function Avatar({ className, src, size = 50 }) {
  // '~default'라는 문자열이 오면 디폴트 이미지로 대체
  const resolvedSrc = (!src || src.includes('default')) ? defaultProfile : src;

  return <StyledAvatar className={className} src={resolvedSrc} size={size} alt="Profile Image" />;
}

const StyledAvatar = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Avatar;
