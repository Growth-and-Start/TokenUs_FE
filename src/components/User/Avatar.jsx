import styled from "styled-components";
import defaultProfile from "../../assets/defaultProfile.png";

function Avatar({ src, size = 50 }) {
  return <StyledAvatar src={src || defaultProfile} size={size} alt="Profile Image" />;
}

const StyledAvatar = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Avatar;
