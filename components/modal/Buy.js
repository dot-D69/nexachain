// Buy.js
"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../library/sanity";

const Buy = ({ selectedToken, thirdWebTokens, walletAddress }) => {
  // State for the amount of ETH user wants to spend.
  const [amount, setAmount] = useState("");
  // Transaction status: idle, processing, success, or error.
  const [txStatus, setTxStatus] = useState("idle");
  // Store the token image URL.
  const [imageUrl, setImageUrl] = useState(null);
  // The token instance from thirdWebTokens matching selectedToken.
  const [activeToken, setActiveToken] = useState(null);

  // Set activeToken based on matching contract addresses.
  useEffect(() => {
    if (thirdWebTokens && selectedToken) {
      const token = thirdWebTokens.find(
        (token) =>
          token.address.toLowerCase() === selectedToken.contractAddress.toLowerCase()
      );
      setActiveToken(token);
    }
  }, [selectedToken, thirdWebTokens]);

  // Get the token's image URL using Sanity's image builder.
  useEffect(() => {
    if (selectedToken.logo) {
      const url = imageUrlBuilder(client).image(selectedToken.logo).url();
      setImageUrl(url);
    }
  }, [selectedToken]);

  // Function to handle buying tokens.
  const buyToken = async () => {
    // Validate the amount input.
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount of ETH.");
      return;
    }
    if (!activeToken) {
      alert("Token not loaded properly.");
      return;
    }

    try {
      // Set transaction status to processing.
      setTxStatus("processing");

      // For demonstration purposes, we'll simulate a buy by sending ETH
      // from the user's wallet to a designated market address.
      // In a real scenario, you'd interact with a smart contract method
      // that handles buying (e.g., a DEX swap or a custom buy function).
      
      // Replace '0xMarketAddress' with the actual market or contract address.
      const marketAddress = "0xMarketAddress"; // <-- Update this address accordingly

      // Using the ERC-20 send method to simulate the transaction.
      const tx = await activeToken.erc20.send(
        marketAddress,
        ethers.utils.parseEther(amount)
      );
      
      // Wait for the transaction to complete.
      await tx.wait();
      
      // If successful, update status.
      setTxStatus("success");
    } catch (error) {
      console.error("Buy transaction failed: ", error);
      setTxStatus("error");
    }
  };

  return (
    <Wrapper>
      <Heading>Buy {selectedToken.name}</Heading>
      {imageUrl && <TokenImage src={imageUrl} alt={selectedToken.name} />}
      
      <Label>Amount in ETH:</Label>
      <Input
        type="number"
        placeholder="Enter ETH amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      
      <Button onClick={buyToken} disabled={txStatus === "processing"}>
        {txStatus === "processing" ? "Processing..." : "Buy"}
      </Button>
      
      {txStatus === "success" && (
        <StatusMessage>Transaction Complete</StatusMessage>
      )}
      {txStatus === "error" && (
        <StatusMessage style={{ color: "red" }}>
          Transaction Failed
        </StatusMessage>
      )}
    </Wrapper>
  );
};

export default Buy;

/* ---------------- Styled Components ---------------- */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
  background: #0a0b0d;
  color: white;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #3773f5;
  color: #000;
  border: none;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TokenImage = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
`;
