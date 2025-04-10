import styled from "styled-components";
import { MAIN, GRAY_SCALE, BACKGROUND, TEXT } from "../../../constants/colors";
import FONT from "../../../constants/fonts";

const tempData = [
  {
    "account": "0xf2nr...0013",
    "price": "5.07"
  },
  {
    "account": "0xf2nr...0013",
    "price": "5.00"
  },
  {
    "account": "0xf2nr...0013",
    "price": "5.00"
  },
  {
    "account": "0xf2nr...0013",
    "price": "4.89"
  },
  {
    "account": "0xf2nr...0013",
    "price": "5.02"
  },
  {
    "account": "0xf2nr...0013",
    "price": "4.70"
  }
]

function Holder({account, price, index}) {
  return(
    <>
    <HolderWrapper isOdd={index % 2 !== 0}>
      <UserAccount>{account}</UserAccount>
      <Price>{price} MATIC</Price>
    </HolderWrapper>
    </>
  )
}

const HolderWrapper = styled.div`
display: flex;
justify-content: space-between;
padding: 15px;
background-color: ${(props) =>
    props.isOdd ? GRAY_SCALE.GRAY100 : BACKGROUND.WHITE };
`;
const UserAccount = styled.div`
  ${FONT.BODY2}
  color: ${GRAY_SCALE.GRAY700};
`;  
const Price = styled.div`
display: flex;
justify-content: center;
align-items: center;
${FONT.BODY2};
color: ${TEXT.BLACK};
`;



function HolderList() {
  return (
    <>
      <HolderListWrapper>
        <Title>
          <span style={{ color: MAIN.BLUE }}>{tempData.length}명</span>이 이 NFT를 함께 소유해요
        </Title>
        <List>
          {tempData.map((holder,index)=>(
            <Holder
            key={index}
            account={holder.account}
            price={holder.price}
            index={index}
            />
          ))}
        </List>
      </HolderListWrapper>
    </>
  );
}

const HolderListWrapper = styled.div`
  width: 25%;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  border-radius: 5px;
`;

const Title = styled.div`
  padding: 10px 15px 5px 15px;
  font-size: 15px;
`;

const List = styled.div`
max-height: 200px; /* 최대 높이 설정 */
  overflow-y: auto; /* 내용이 넘치면 세로 스크롤 생성 */
  scrollbar-width: thin; /* Firefox에서 스크롤바 얇게 */
  scrollbar-color: ${GRAY_SCALE.GRAY300} transparent; /* 스크롤 색상 설정 */
   /* Webkit(Chrome, Edge)용 스크롤바 스타일 */
   &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 */
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${GRAY_SCALE.GRAY300}; /* 스크롤 색 */
    border-radius: 4px;
  }
  `;

export default HolderList;