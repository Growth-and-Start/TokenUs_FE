import styled from "styled-components";
import { GRAY_SCALE, MAIN, TEXT } from "../../../constants/colors";
import Avatar from "../../User/Avatar";

function NFTDesc({title, description, creator, mintPrice, floorPrice}) {
  return (
    <Wrapper>
      <VideoInfo>
        <Title>제목입니다.</Title>
        <Description>설명입니다.</Description>
        <Creator><StyledAvatar size={28}/>크리에이터</Creator>
      </VideoInfo>
      <PriceInfo>
        <Price>Mint Price <Matic>100 Matic</Matic></Price>
        <Divide>|</Divide>
        <Price>Floor Price <Matic>100 Matic</Matic></Price>
      </PriceInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  /* border: 1px solid ${GRAY_SCALE.GRAY300}; */
  border-radius: 5px;
  padding: 0 20px;
  background-color: white;
`;

const VideoInfo = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
padding : 20px 0 10px 0;
border-bottom: 1px solid ${GRAY_SCALE.GRAY300};
`;

const Title = styled.div`
color:${TEXT.BLACK};
font-size: 18px;
font-weight: 550;
`;

const Description = styled.div`
color: ${TEXT.GRAY};
font-size: 14px;
`;

const Creator = styled.div`
margin-top: 10px;
font-size: 14px;
display: flex;
align-items: center;
gap: 7px;
`;

const StyledAvatar = styled(Avatar)`

`

const PriceInfo = styled.div`
padding: 20px 0;
display: flex;
justify-content: flex-end;
gap:15px;
`;

const Price = styled.div`
color: ${GRAY_SCALE.GRAY700};
font-size: 14px;
font-weight: 550;
display: flex;
align-items: end;
gap: 15px;
`;

const Matic = styled.div`
  color:${MAIN.BLUE};
  font-size: 16px;
`

const Divide = styled.div`
color: ${GRAY_SCALE.GRAY300};
`;

export default NFTDesc;
