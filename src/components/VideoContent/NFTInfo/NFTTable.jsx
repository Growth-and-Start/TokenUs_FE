import styled from "styled-components";
import { GRAY_SCALE, WARNING } from "../../../constants/colors";
import { weiToMatic } from "../../../utils/blockchainNetwork";


function NFTTable({ NFTs }) {
  // 1. currentPrice 기준으로 정렬 (원본을 변형하지 않도록 복사)
  const sortedNFTs = [...NFTs].sort(
    (a, b) => Number(a.currentPrice) - Number(b.currentPrice)
  );

  return (
    <TableWrapper>
      <TableHeader>
        <th>구매 가능한 NFT ({NFTs.length})</th>
        <th>가격</th>
      </TableHeader>
      <TableBody>
        {sortedNFTs.map((nft, index) => (
          <tr key={nft.tokenId}>
            <td>
              {nft.nftName} ({nft.tokenId})
              {index === 0 && <FloorTag>Floor</FloorTag>}
            </td>
            <td>{weiToMatic(nft.currentPrice)}&nbsp;&nbsp;MATIC</td>
          </tr>
        ))}
      </TableBody>
    </TableWrapper>
  );
}

export default NFTTable;

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
`;

const TableHeader = styled.thead`
  th {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-weight: 600;
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #f0f0f0;
  }

  td {
    padding: 12px;
    vertical-align: middle;
    color: ${GRAY_SCALE.GRAY700};
  }
`;

const FloorTag = styled.span`
  display: inline-block;
  border: 1px solid red;
  color: ${WARNING.TEXT};
  background-color: ${WARNING.BACKGROUND};
  font-size: 12px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 15px;
`;
