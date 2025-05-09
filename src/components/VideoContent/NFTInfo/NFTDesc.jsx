import styled from "styled-components";
import { GRAY_SCALE, MAIN, TEXT } from "../../../constants/colors";
import Avatar from "../../User/Avatar";
import { weiToMatic } from "../../../utils/blockchainNetwork";

function NFTDesc({className, title, description, creator, mintPrice, floorPrice, profile}) {
    //matic 단위 변환
    const mintPriceMatic = Number(weiToMatic(mintPrice)).toFixed(3);
    const floorPriceMatic = Number(weiToMatic(floorPrice)).toFixed(3);
  return (
    <Wrapper className={className}>
      <VideoInfo>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Creator><StyledAvatar src={profile} size={28}/>{creator}</Creator>
      </VideoInfo>
      <PriceInfo>
        <Price>Mint Price <Matic>{mintPriceMatic} Matic</Matic></Price>
        <Divide>|</Divide>
        <Price>Floor Price <Matic>{floorPriceMatic} Matic</Matic></Price>
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
gap: 6px;
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
margin-top: 15px;
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
