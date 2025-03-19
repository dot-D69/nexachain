// TradeModal.js
"use client";

import React, { useState } from "react";
import styled from "styled-components";

import Buy from "./Buy";
import Sell from "./Sell";

const TradeModal = ({ sanityTokens, thirdWebTokens, walletAddress }) => {
  // 'action' will track whether the user wants to "buy" or "sell"
  const [action, setAction] = useState("buy");
  
  // We'll set a default selected token. Here, we choose the first token from sanityTokens.
  const [selectedToken, setSelectedToken] = useState(sanityTokens[0]);

  // This function will decide which component to render based on 'action'
  const renderComponent = () => {
    if (action === "buy") {
      return (
        <Buy 
          selectedToken={selectedToken} 
          thirdWebTokens={thirdWebTokens} 
          walletAddress={walletAddress} 
        />
      );
    } else if (action === "sell") {
      return (
        <Sell 
          selectedToken={selectedToken} 
          thirdWebTokens={thirdWebTokens} 
          walletAddress={walletAddress} 
        />
      );
    }
  };

  return (
    <Wrapper>
      {/* Selector for Buy or Sell */}
      <Selector>
        <Option 
          onClick={() => setAction("buy")} 
          style={action === "buy" ? selectedStyle : unselectedStyle}
        >
          Buy
        </Option>
        <Option 
          onClick={() => setAction("sell")} 
          style={action === "sell" ? selectedStyle : unselectedStyle}
        >
          Sell
        </Option>
      </Selector>
      {/* Main content area where either the Buy or Sell component will render */}
      <ModalMain>
        {renderComponent()}
      </ModalMain>
    </Wrapper>
  );
};

export default TradeModal;

/* ----- Styled Components ----- */
const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: white;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`;

const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`;

const Option = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`;

// Style for the selected option (active tab)
const selectedStyle = {
  color: "#3773f5",
  border: "1px solid #3773f5",
};

// Style for the unselected option
const unselectedStyle = {
  border: "1px solid #282b2f",
};

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`;
