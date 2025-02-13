import styled from "styled-components";

function Avatar({ src, size = 50 }) {
  return <StyledAvatar src={src} size={size} alt="Profile Image" />;
}

const StyledAvatar = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Avatar;
