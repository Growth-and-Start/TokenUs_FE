import styled from "styled-components";

function Video({ url, className }) {
  return (
    <>
      <StyledVideo controls width="100%" src={url} className={className}/>
    </>
  );
}

const StyledVideo = styled.video`
  border-radius: 10px;
`;

export default Video;
