// Buy.js
"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../library/sanity";

const Buy = ({ thirdWebTokens, walletAddress }) => {
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState("idle");
  const [activeToken, setActiveToken] = useState(null);
  const [sanityTokens, setSanityTokens] = useState([]);
  const [selectedTokenName, setSelectedTokenName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch all tokens from Sanity
  useEffect(() => {
    const fetchSanityTokens = async () => {
      const query = '*[_type == "coins"]{name, symbol, logo, contractAddress}';
      const result = await client.fetch(query);
      setSanityTokens(result);

      if (result.length > 0) {
        setSelectedTokenName(result[0].name);
      }
    };

    fetchSanityTokens();
  }, []);

  // Sync selected token to thirdWebTokens
  useEffect(() => {
    const selectedSanity = sanityTokens.find((token) => token.name === selectedTokenName);
    if (selectedSanity && thirdWebTokens) {
      const token = thirdWebTokens.find(
        (t) => t.address.toLowerCase() === selectedSanity.contractAddress.toLowerCase()
      );
      setActiveToken(token);

      // Set token logo
      if (selectedSanity.logo) {
        const url = imageUrlBuilder(client).image(selectedSanity.logo).url();
        setImageUrl(url);
      }
    }
  }, [selectedTokenName, thirdWebTokens, sanityTokens]);

  const buyToken = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!activeToken) {
      alert("Token not selected properly.");
      return;
    }

    try {
      setTxStatus("processing");

      // Replace this with a real testnet address if needed
      const marketAddress = "0x1111111111111111111111111111111111111111";

      const tx = await activeToken.erc20.send(
        marketAddress,
        ethers.utils.parseEther(amount)
      );

      await tx.wait();

      setTxStatus("success");
    } catch (error) {
      console.error("Buy transaction failed: ", error);
      setTxStatus("error");
    }
  };

  const selectedSymbol = sanityTokens.find(
    (token) => token.name === selectedTokenName
  )?.symbol;

  return (
    <Wrapper>
      <Heading>Buy {selectedTokenName || "Token"}</Heading>

      {imageUrl && <TokenImage src={imageUrl} alt={selectedTokenName} />}

      <Label>Select Token:</Label>
      <Select
        value={selectedTokenName}
        onChange={(e) => setSelectedTokenName(e.target.value)}
      >
        {sanityTokens.map((token) => (
          <option key={token.contractAddress} value={token.name}>
            {token.name}
          </option>
        ))}
      </Select>

      <Label>Amount in {selectedSymbol || "Token"}:</Label>
      <Input
        type="number"
        placeholder={`Enter ${selectedSymbol || "Token"} amount`}
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

const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
  background: #0a0b0d;
  color: white;
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
  margin: 1rem auto;
`;

const StatusMessage = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
`;
