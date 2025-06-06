"use client";

import styled from "styled-components";
import { useWeb3 } from "@3rdweb/hooks";
import Dashboard from "./dashboard"; // Adjust this if Dashboard is in another folder

export default function Home() {
  const {address,connectWallet} = useWeb3()

  return (
    <Wrapper>
    {address ? (
        <Dashboard address={address} />
      ) : (<WalletConnect>
        <Button onClick={()=> connectWallet('injected') }>Connect Wallet</Button>    
        <Details>
              You need Chrome to be
              <br /> able to run this app.
            </Details>
        </WalletConnect>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  max-width: 100vw;
  background-color:rgb(3, 3, 4);
  color: white;
  display: grid;
  place-items: center;
`
const WalletConnect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Button = styled.div`
border: 1px solid #28b2f;
padding: 1rem;
font-size: 1.3 rem;
border-radius: 0.4rem;
  background-color: #3773f5;
  color: #000;
  &:hover {
    cursor: pointer;
  }
`

const Details = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
  color: #282b2f;
`

