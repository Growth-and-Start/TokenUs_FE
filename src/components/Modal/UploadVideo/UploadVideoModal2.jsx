import styled from "styled-components";
import Button1 from "../../Button/Button1";
import Button2 from "../../Button/Button2";
import TextInput from "../../Input/TextInput";
import BasicModalLayout from "../Layout/BasicModalLayout";
import { SECONDARY, MAIN } from "../../../constants/colors";
import LoadingMessage from "../../Message/LoadingMessage";

function UploadVideoModal2({
  onBack,
  onChange,
  onSubmit,
  data,
  setNftData,
  loading,
}) {
  const handleIncreasePrice = () => {
    const currentPrice = parseFloat(data.price || 0) || 0;
    const newPrice = (currentPrice + 0.01).toFixed(2);
    setNftData((prev) => ({ ...prev, price: newPrice }));
  };

  // const handleDecreasePrice = () => {
  //   const currentPrice = parseFloat(data.nftPrice || "0") || 0;
  //   const newPrice = Math.max(currentPrice - 0.001, 0).toFixed(3); // 최소값 0
  //   setNftData((prev) => ({ ...prev, nftPrice: newPrice }));
  // };

  const handleIncreaseSupply = () => {
    const currentSupply = parseInt(data.totalSupply || "0") || 0;
    setNftData((prev) => ({ ...prev, totalSupply: currentSupply + 1 }));
  };

  // const handleDecreaseSupply = () => {
  //   const currentSupply = parseInt(data.totalSupply || "0") || 0;
  //   setNftData((prev) => ({
  //     ...prev,
  //     totalSupply: Math.max(currentSupply - 1, 1),
  //   }));
  // };

  return (
    <BasicModalLayout
      header={"비디오 업로드"}
      footer={
        <>
          <Button2 onClick={onBack} width="100px" fontSize="15px">
            이전
          </Button2>
          <Button1
            onClick={onSubmit}
            width="100px"
            fontSize="15px"
            disabled={
              !(data.nftName.trim() !== "" && data.nftSymbol.trim() !== "" && !loading)
            }
          >
            업로드
          </Button1>
        </>
      }
    >
      <TextInput onChange={onChange} name="nftName" data={data.nftName}>
        NFT 이름
      </TextInput>

      <TextInput onChange={onChange} name="nftSymbol" data={data.nftSymbol}>
        NFT symbol
      </TextInput>

      <InputsContainer>
        <InputItem>
          <Label>NFT 가격 (MATIC)</Label>
          <InputRow>
            <StyledInput
              type="number"
              step="0.01"
              name="price"
              value={data.price || ""}
              onChange={onChange}
              min="0"
            />
            <PlusButton onClick={handleIncreasePrice}>+</PlusButton>
          </InputRow>
        </InputItem>

        <InputItem>
          <Label>NFT 거래수량</Label>
          <InputRow>
            <StyledInput
              type="number"
              name="totalSupply"
              value={data.totalSupply || ""}
              onChange={onChange}
              min="1"
            />
            <PlusButton onClick={handleIncreaseSupply}>+</PlusButton>
          </InputRow>
        </InputItem>
      </InputsContainer>
      {loading ? (
        <LoadingContainer>
          <LoadingMessage size={14}>잠시만 기다려 주세요...</LoadingMessage>
        </LoadingContainer>
      ) : null}
    </BasicModalLayout>
  );
}

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 520;
  font-size: 15px;
  margin-bottom: 10px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledInput = styled.input`
  height: 40px;
  width: 150px;
  padding: 0 10px;
  border: 1px solid #73798d;
  border-radius: 6px;
  background-color: #f8f8ff;
  font-size: 16px;
`;

const PlusButton = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${SECONDARY.BLUE};
  border-radius: 50%;
  color: ${MAIN.BLUE};
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: #265cffb4;
    border-color: #265cffb4;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default UploadVideoModal2;
