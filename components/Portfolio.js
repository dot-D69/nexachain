import React, {useEffect, useState} from "react";
import { useWeb3 } from '@3rdweb/hooks';
import styled from "styled-components";
import { coins } from "../static/coin";
import Coin from "./Coin";
import { BsThreeDotsVertical } from "react-icons/bs";
import BalanceChart from "./BalanceChart";
import { getTokenBalances } from "../library/getTokenBalance";




const Portfolio = ({thirdWebTokens, sanityTokens, walletAddress}) => {
  const [walletBalance, setWalletBalance] = useState(0)
  const [sender] = useState(walletAddress)

  const getBalance = async activeTwToken => {
    const balance = await activeTwToken.erc20.balance(sender)

    return parseInt(balance.displayValue)
  }

  const { address, provider } = useWeb3();
  const [tokenData, setTokenData] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!address || !provider) return;
  
      const balances = await getTokenBalances(address, provider);
      console.log("Returned token balances:", balances);
      setTokenData(balances);
    };
  
    fetchBalances();
  }, [address, provider]);
  


  useEffect(() => {
    const calculateTotalBalance = async () => {
      setWalletBalance(0)

      sanityTokens.map(async token => {
        const currentTwToken = thirdWebTokens.filter(
          twToken => twToken.address === token.contractAddress,
        )

        const balance = await getBalance(currentTwToken[0])
        setWalletBalance(prevState => prevState + balance * token.usdPrice)
      })
    }

    if (sanityTokens.length > 0 && thirdWebTokens.length > 0) {
      calculateTotalBalance()
    }
  }, [thirdWebTokens, sanityTokens])
  return (
    <Wrapper>
      <Content>
        <Balance>
              <BalanceTitle>Portfolio balance</BalanceTitle>
              <BalanceValue>
                {'$'}
                {walletBalance.toLocaleString('US')}
              </BalanceValue>
        </Balance>
        <BalanceChart coins={coins} walletAddress={walletAddress} sanityTokens={sanityTokens} thirdWebTokens= {thirdWebTokens}  />
      <PortfolioTable>
        {/* Table Title */}
        <TableItem>
          <Title>Your Assets</Title>
        </TableItem>
        <Divider />

        {/* Table Headers */}
        <Table>
          <TableItem>
            <TableHeader>
            <Column style={{ flex: 3, textAlign: "left" }}>Name</Column>
              <Column style={{ flex: 2, textAlign: "right" }}>Balance</Column>
              <Column style={{ flex: 1.5, textAlign: "right" }}>Price</Column>
              <Column style={{ flex: 1, textAlign: "right" }}>Allocation</Column>
              <Column style={{ flex: 0.5, textAlign: "center", minWidth: "20px" }}>
                <BsThreeDotsVertical />
              </Column>
            </TableHeader>
          </TableItem>
          <Divider />

          {/* Table Data */}
          <TableBody>
            {tokenData.length > 0 ? (
            tokenData.map((token, index) => (
            <React.Fragment key={index}>
             <AssetRow>
              <AssetInfo style={{ flex: 3 }}>
              {token.logo && (
                <TokenLogo src={token.logo} alt={token.symbol} />
              )}
              <div>
                <AssetName>{token.name}</AssetName>
                <AssetSymbol>{token.symbol}</AssetSymbol>
              </div>
            </AssetInfo>
            <AssetValue style={{ flex: 2, textAlign: "right" }}>
            {token.balance} {token.symbol}
          </AssetValue>
          <AssetPrice style={{ flex: 1.5, textAlign: "right" }}>
            ${parseFloat(token.usdPrice).toFixed(2)}
          </AssetPrice>
          <AssetAllocation style={{ flex: 1, textAlign: "right" }}>
            {token.allocation ? `${token.allocation}%` : "N/A"}
          </AssetAllocation>
          <AssetActions style={{ flex: 0.5, textAlign: "center" }}>
            <BsThreeDotsVertical />
          </AssetActions>
        </AssetRow>
        <Divider />
      </React.Fragment>
    ))
  ) : (
    <div>Loading assets...</div>
  )}
</TableBody>
        </Table>
      </PortfolioTable>
      </Content>
    </Wrapper>
  );
};

export default Portfolio;

/* ----------------- Styled Components ----------------- */

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
  width: 100%;
  max-width: 900px;
  background-color: #121212;
  border-radius: 10px;
  overflow: hidden;
`;

const Table = styled.div`
  width: 100%;
`;

const TableItem = styled.div`
  padding: 1rem 2rem;
`;

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1rem;
  padding-bottom: 0.5rem;
`;

const TableBody = styled.div`
  width: 100%;
`;

const Column = styled.div`
  text-align: left;
  color: #c7cbd6;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`
const Balance = styled.div``

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`

const AssetRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
`;

const AssetInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TokenLogo = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 0.5rem;
  border-radius: 50%;
`;

const AssetName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
`;

const AssetSymbol = styled.div`
  font-size: 0.9rem;
  color: #8a919e;
`;

const AssetValue = styled.div`
  font-size: 1.2rem;
  color: white;
`;

const AssetPrice = styled.div`
  font-size: 1.2rem;
  color: white;
`;

const AssetAllocation = styled.div`
  font-size: 1.2rem;
  color: white;
`;

const AssetActions = styled.div`
  font-size: 1.2rem;
  color: #c7cbd6;
`;
