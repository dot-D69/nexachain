"use client"
import React, {useEffect, useState} from "react";
import Header from '../components/Header';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import {ethers} from "ethers"
import {ChainId, ThirdwebSDK} from '@thirdweb-dev/sdk'

const privateKey = process.env.NEXT_PUBLIC_METAMASK_KEY;


if (!privateKey) {
    throw new Error("❌ Private Key is missing! Check your .env file.");
}


const provider = new ethers.providers.StaticJsonRpcProvider(
    "https://sepolia.infura.io/v3/7e9f29ab84eb48e8bf3a6bd710538914",
    {
    chainId: 11155111,
    name: "sepolia"
    }
);


const sdk = new ThirdwebSDK(
    new ethers.Wallet(privateKey, provider),{clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
);


const Dashboard = ({ address }) => {
    const [sanityTokens,setSanityTokens] = useState([]);
    const[thirdWebTokens,setThirdWebTokens] = useState([]);
    useEffect(() => {
        const getSanityAndThirdWebTokens = async () => {
            const coins = await fetch("https://okyxh4w5.api.sanity.io/v2025-02-14/data/query/production?query=*%5B_type%3D%3D%27coins%27%5D%7B%0A++name%2C%0A++usdPrice%2C%0A++contractAddress%2C%0A++symbol%2C%0A++logo%0A%7D&perspective=published");  
            const sanityTokens = (await coins.json()).result;

            setSanityTokens(sanityTokens);
            const thirdWebTokens = await Promise.all(
            sanityTokens.map(async (token) =>{
                const contract = await sdk.getContract(token.contractAddress)
                return {
                    address: contract.getAddress(),
                    metadata: await contract.metadata.get(), // Fetch token metadata
                    balance: await contract.erc20.balanceOf(address), // Fetch user balance
                    erc20: contract.erc20, // Attach ERC-20 functions for transfers
                };

            } )
            );
            setThirdWebTokens(thirdWebTokens)
        }
        getSanityAndThirdWebTokens();
    }, []);
    console.log('Sanity ->', sanityTokens)
    console.log('Thirdweb ->', thirdWebTokens)
     // In Dashboard
    
    return (
        <Wrapper>
            <Sidebar />
            <MainContainer>
                <Header walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens= {thirdWebTokens}/>
                <Main walletAddress={address} sanityTokens={sanityTokens} thirdWebTokens= {thirdWebTokens} />
            </MainContainer>
        </Wrapper>

    )
}

export default Dashboard

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #0a0b0d;
    color: white;
    overflow: auto;
`

const MainContainer = styled.div`
    flex: 1;
`