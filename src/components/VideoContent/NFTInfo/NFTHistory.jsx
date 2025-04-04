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

function NFTHistory({history, className}) {
  return (
    <>
      <HolderListWrapper className={className}>
        <Title>
          Transaction History
        </Title>
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

export default NFTHistory;
