import { useState } from 'react'
import styled from 'styled-components'
import CoinItem from './CoinItem'

const CoinSelect = ({
    setAction,
    selectedToken,
    setSelectedToken,
    sanityTokens,
    thirdWebTokens,
    walletAddress,
  }) =>{
    return <Wrapper>
        <Title>Select Coin </Title>
        <CoinList>
            {sanityTokens.map((token,index) =>(
                <CoinItem
                key ={index}
                token={token}
                sender= {walletAddress}
                selectedToken={selectedToken}
                setAction={setAction}
                setSelectedToken={setSelectedToken}
                sanityTokens={sanityTokens}
                thirdWebTokens={thirdWebTokens}
                />
            ))}
        </CoinList>
    </Wrapper>
  }

export default CoinSelect

const Wrapper = styled.div``
const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`
const CoinList = styled.div`
  display: flex;
  flex-direction: column;
`