import styled from "styled-components";
import { MAIN, GRAY_SCALE, BACKGROUND } from "../../../constants/colors";
import { weiToMatic } from "../../../utils/blockchainNetwork";

const shortenHash = (hash) => {
  if (!hash || hash.length < 10) return hash;
  return `${hash.slice(0, 10)}...${hash.slice(-4)}`;
};

function Holder({ hash, price, index }) {
  return (
    <>
      <HolderWrapper isOdd={index % 2 == 0}>
        <TxHash
        href={`https://amoy.polygonscan.com/tx/${hash}`}
        target="_blank" rel="noopener noreferrer"
        >{shortenHash(hash)}</TxHash>

        <NFTPrice>{price} Matic</NFTPrice>
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

const TxHash = styled.a`
  font-size: 15px;
  color: ${GRAY_SCALE.GRAY500};

  &:hover{
    color: ${GRAY_SCALE.GRAY700};
  }
`;
const NFTPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;


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
                hash={holder.txHash}
                price={weiToMatic(holder.tradePrice)}
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
