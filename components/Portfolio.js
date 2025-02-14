import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { coins } from "../static/coin";
import Coin from "./Coin";
import { BsThreeDotsVertical } from "react-icons/bs";
import BalanceChart from "./BalanceChart";




const Portfolio = ({thirdWebTokens, sanityTokens, walletAddress}) => {
  return (
    <Wrapper>
      <Content>
        {/* Add Balance chart at top */}
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
            {coins.map((coin, index) => (
              <React.Fragment key={index}>
                <Coin coin={coin} />
                <Divider />
              </React.Fragment>
            ))}
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
