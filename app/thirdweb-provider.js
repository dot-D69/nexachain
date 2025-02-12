"use client";

import { ThirdwebWeb3Provider } from "@3rdweb/hooks";

const supportedChainIds = [11155111, 80001]; // Sepolia and Mumbai testnets
const connectors = {
  injected: {},
};

export default function ThirdwebProvider({ children }) {
  return (
    <ThirdwebWeb3Provider supportedChainIds={supportedChainIds} connectors={connectors}>
      {children}
    </ThirdwebWeb3Provider>
  );
}
