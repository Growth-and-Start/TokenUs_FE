import styled from "styled-components";
import { BACKGROUND, TEXT, MAIN, GRAY_SCALE } from "../../constants/colors";
import FONT from "../../constants/fonts";
import Button1 from "../../components/Button/Button1";
import { useEffect, useState } from "react";
import Button2 from "../../components/Button/Button2";
import { getMyInfo } from "../../services/channelService";
import { connectWallet } from "../../utils/blockchainNetwork";
import { postWalletAddress } from "../../services/channelService";

const WalletPage = () => {
  const [walletList, setWalletList] = useState([{name:"address1", address:"", isChecked: true}]);

  //지갑 주소 등록하기
  const registerWallet = async() => {
    const myAddress = await connectWallet();
    console.log("연결할 지갑 주소: ", myAddress);
    try{
      await postWalletAddress(myAddress);
      setWalletList((prevList) =>
        prevList.map((item, index) =>
          index === 0
            ? { ...item, address: myAddress }
            : item
        )
      );
    }catch(error){
      console.log("지갑 주소 등록 실패:", error);
    }

    
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const myData = await getMyInfo();
        setWalletList((prevList) =>
          prevList.map((item, index) =>
            index === 0
              ? { ...item, address: myData.walletAddress }
              : item
          )
        );
      } catch (error) {
        console.log("지갑 정보 가져오기 실패:", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <PageWrapper>
      {/* 개인 지갑 주소 등록 */}
      <Section>
        <Title>개인 지갑 주소 등록</Title>
        <InfoCard>
          <DescriptionText>TokenUs 플랫폼에 지갑 주소를 등록하면 <span style={{ color: MAIN.BLUE }}>내 영상을 업로드해 NFT를 발행하거나, 다른 크리에이터의 NFT를 구매</span>하여<br />2차 창작에도 참여할 수 있습니다. <span style = {{color : GRAY_SCALE.GRAY700}}>MetaMask를 설치한 후, 연결 상태를 확인해주세요.</span></DescriptionText>
          <Button1 onClick={registerWallet} width = "120px" fontSize="15px">주소 등록</Button1>
        </InfoCard>
      </Section>

      {/* 연결된 지갑 관리 */}
      <Section>
        <Title>연결된 지갑 관리</Title>
        <WalletTable>
          <thead>
            <tr>
              <th>현재 지갑</th>
              <th>주소 별명</th>
              <th>지갑 주소</th>
            </tr>
          </thead>
          <tbody>
            {walletList.map((wallet) => (
              <tr key={wallet.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={wallet.isChecked}
                    onChange={() => {
                    setWalletList(prev =>
                      prev.map(item =>
                        item.id === wallet.id ? { ...item, isChecked: !item.isChecked } : item
                      )
                    );
                  }}
                  />
                </td>
                <td>{wallet.name}</td>
                <td>{wallet.address}</td>
              </tr>
            ))}
          </tbody>
        </WalletTable>
      </Section>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width : 100%
`;

const Title = styled.div`
  ${FONT.TITLE};
  color: ${MAIN.BLUE};
`;

const InfoCard = styled.div`
  display : flex;
  flex-direction : row;
  height : 100px;
  /* gap : 40px; */
  padding : 20px 40px;
  border-radius : 10px;
  justify-content : space-around;
  background-color : ${BACKGROUND.WHITE};
  box-shadow : 1px 1px 7px ${GRAY_SCALE.GRAY300};
  align-items : center;
`

const DescriptionText = styled.div `
  ${FONT.BODY1};
  color : ${TEXT.BLACK};
`

const WalletTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${BACKGROUND.WHITE};
  font-size: 14px;

  th, td {
    padding: 16px;
    text-align: center;
    border: 1px solid ${GRAY_SCALE.GRAY300};
  }

  th {
    background-color: ${GRAY_SCALE.GRAY100};
    color: ${TEXT.BLACK};
    ${FONT.BODY1};
  }

  td {
    ${FONT.CAPTION};
    color: ${TEXT.BLACK};
  }
`;

export default WalletPage;