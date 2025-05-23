import React from 'react'
import Portfolio  from './Portfolio'
import styled from 'styled-components'
import Promos from './Promo'

const Main = ({thirdWebTokens, sanityTokens, walletAddress}) =>{
    return(
    <Wrapper>
        <Portfolio walletAddress={walletAddress} sanityTokens={sanityTokens} thirdWebTokens= {thirdWebTokens}  />
        <Promos/>
    </Wrapper>
    )
}
export default Main

const Wrapper = styled.div`
  display: flex;
  max-height: calc(100vh - 64px);
  overflow: auto;

  &::-webkit-scrollbar{
      display: none;
  }

  & div {
    border-radius: 0.4rem;
  }
`