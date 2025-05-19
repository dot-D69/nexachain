"use client"

import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { useRouter } from 'next/navigation'
import TransModal from './modal/TransModal'
import TradeModal from './modal/TradeModal'
import Link from 'next/link'

Modal.setAppElement('body')

const Header = ({walletAddress, connectWallet,sanityTokens,thirdWebTokens}) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen]= useState(false);
  useEffect(() => {
    if (modalIsOpen) {
      router.push('/?transfer=1');
    } else {
      router.push('/');
    }
  }, [modalIsOpen, router]);



    return( 
        <Wrapper>
            <Title>Assests</Title>
            <ButtonsContainer>
              <WalletLink>
                <WalletLinkTitle>Wallet Connected</WalletLinkTitle>
                <WalletAddress>
                  {walletAddress.slice(0,6)}.....{walletAddress.slice(-6)}
                </WalletAddress>
              </WalletLink>
                <Button 
                    style={{ backgroundColor: '#3773f5', color: '#000'}}
                    onClick={() => setTradeModalOpen(true)}
                >
                Buy/Sell
                </Button>
                <Button onClick={() => setModalIsOpen(true)}>Send/ Receive</Button>
            </ButtonsContainer>

            <Modal
              isOpen = {tradeModalOpen}
              onRequestClose={() => setTradeModalOpen(false)}
              style={modalStyles}
            >

              <TradeModal
                  sanityTokens={sanityTokens}
                  thirdWebTokens={thirdWebTokens}
                  walletAddress={walletAddress}
              />
              <CloseButton onClick={() => setTradeModalOpen(false)}>Close</CloseButton>
            </Modal>

            <Modal isOpen={modalIsOpen}
              onRequestClose={() => {setModalIsOpen(false);
              }}
              style={modalStyles}
            >
              <TransModal 
                  sanityTokens={sanityTokens} 
                  thirdWebTokens={thirdWebTokens} 
                  walletAddress={walletAddress} 
              />
              <CloseButton onClick={() => setModalIsOpen(false)}>Close</CloseButton>
            </Modal>
            
        </Wrapper>

    )
}

export default Header

const Wrapper = styled.div`
  width: calc(100%);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #282b2f;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  flex: 1;
`

const ButtonsContainer = styled.div`
  display: flex;
`

const Button = styled.div`
  border: 1px solid #282b2f;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.4rem;
  margin-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`

const WalletLink = styled.div`
  font-size: 0.8rem;
  border: 1px solid #282b2f;
  border-radius: 50rem;
  font-size: 1.2rem;
  margin-right: 1rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`
const WalletLinkTitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: #27ad75;
  font-weight: 600;
`
const WalletAddress = styled.div`
  font-size: 0.8rem;
  /* color: #8a919e; */
`

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#0a0b0d",
    padding: "20px",  //0.8 rem
    borderRadius: "10px", //1 rem
  },
  overlay: {
    backgroundColor: 'rgba(10,11,13,0.75)'
  },
};

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background: #ff3b3b;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;