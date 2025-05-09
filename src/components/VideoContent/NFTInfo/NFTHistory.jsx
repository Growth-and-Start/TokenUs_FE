import styled from "styled-components";
import { MAIN, GRAY_SCALE, BACKGROUND } from "../../../constants/colors";

function Holder({ account, price, index }) {
  return (
    <>
      <HolderWrapper isOdd={index % 2 == 0}>
        <UserAccount>{account}</UserAccount>

        <NFTPrice>{price} ETH</NFTPrice>
      </HolderWrapper>
    </>
  );
}

const HolderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: ${(props) =>
    props.isOdd ? GRAY_SCALE.GRAY100 : BACKGROUND.WHITE};
`;

const UserAccount = styled.div`
  font-size: 15px;
  color: #535761;
`;
const NFTPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;

// const tempData = {
//   NFTPrice: 2.71,
//   NFThistory: [
//     {
//       account: "0xa1b2...c3d4",
//       price: "2.70",
//     },
//     {
//       account: "0xbeef...feed",
//       price: "2.72",
//     },
//     {
//       account: "0xdeed...face",
//       price: "2.65",
//     },
//     {
//       account: "0xfade...d00d",
//       price: "2.68",
//     },
//     {
//       account: "0xdead...beef",
//       price: "2.54",
//     },
//     {
//       account: "0xbaad...cafe",
//       price: "2.68",
//     },
//     {
//       account: "0x0ff1...ce00",
//       price: "2.42",
//     },
//     {
//       account: "0xc001...d00d",
//       price: "2.56",
//     },
//     {
//       account: "0xc002...d30d",
//       price: "2.53",
//     },
//     {
//       account: "0xc001...d00d",
//       price: "2.50",
//     },
//     {
//       account: "0xc001...d00d",
//       price: "2.43",
//     },
//     {
//       account: "0xc001...d00d",
//       price: "2.56",
//     },
//   ],
// };

function NFTHistory({ history, className }) {
  return (
    <>
      <HolderListWrapper className={className}>
        <Title>Transaction History</Title>
        {history && history.length > 0 ? (
          <List>
            {history.map((holder, index) => (
              <Holder
                key={index}
                account={holder.account}
                price={holder.price}
                index={index}
              />
            ))}
          </List>
        ) : (
          <NoTxMessage>거래 내역이 없습니다.</NoTxMessage>
        )}
      </HolderListWrapper>
    </>
  );
}

const HolderListWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid ${GRAY_SCALE.GRAY300};
  border-radius: 5px;
`;

const Title = styled.div`
  padding: 25px 15px;
  font-size: 18px;
  font-weight: 500;
  color: ${MAIN.BLUE};
`;

const List = styled.div`
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${GRAY_SCALE.GRAY300} transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${GRAY_SCALE.GRAY300};
    border-radius: 4px;
  }
`;

const NoTxMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: 30% 0;
  background-color: ${GRAY_SCALE.GRAY100};
`;

export default NFTHistory;
