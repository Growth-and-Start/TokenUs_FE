//메타마스크 지갑 연결
export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];
      alert(`✅ 지갑이 연결되었습니다:\n${walletAddress}`);
      return walletAddress;
    } catch (error) {
      console.error("❌ 지갑 연결 실패:", error);
      alert("지갑 연결에 실패했습니다.");
    }
  } else {
    alert("메타마스크가 설치되어 있지 않습니다.");
  }
};
