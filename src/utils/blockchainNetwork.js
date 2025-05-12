import Web3 from 'web3';

const web3 = new Web3();

//메타마스크 지갑 연결
export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];
      alert(`✅ 연결할 지갑 주소:\n${walletAddress}`);
      return walletAddress;
    } catch (error) {
      console.error("❌ 지갑 연결 실패:", error);
      alert("지갑 연결에 실패했습니다.");
    }
  } else {
    alert("메타마스크가 설치되어 있지 않습니다.");
  }
};

//MATIC to WEI 변환 (POST 시 사용)
export const maticToWei= (maticValue) => {
  if (!maticValue || isNaN(Number(maticValue))) return "0"; 
  return web3.utils.toWei(maticValue, 'ether');
}

//WEI to MATIC 변환 (GET 시 사용)
export const weiToMatic = (weiValue)=> {
  if (!weiValue || isNaN(Number(weiValue))) return "0"; 
  return web3.utils.fromWei(weiValue, 'ether');
}
