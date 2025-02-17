import React,{useEffect, useState} from "react";
import styled from "styled-components";
import {FaWallet} from 'react-icons/fa';
import {ethers} from "ethers";
import imageUrlBuilder from '@sanity/image-url'
import {client} from '../../library/sanity'
import { isAddress } from "ethers/lib/utils";


const Transfer =({selectedToken, setAction, thirdWebTokens, walletAddress}) =>{
    const [amount,setAmount] = useState()
    const [recipient,setRecipient] = useState()
    const [imageUrl,setImageUrl] =useState(null)
    const [activetwToken, setActivetwToken] = useState()
    const  [balance, setBalance] = useState('Fetching...')
    const[isAddressValid, setIsAddressValid]= useState(true);

    useEffect(() =>{
        const activeToken = thirdWebTokens.find(token=> token.address == selectedToken.contractAddress)
        setActivetwToken(activeToken)
    }, [thirdWebTokens,selectedToken])

    useEffect(() =>{
        const url = imageUrlBuilder(client).image(selectedToken.logo).url()
        setImageUrl(url)
    }, [selectedToken])

    useEffect(()=>{
        const getBalance = async() =>{
            const balance = await activetwToken.erc20.balanceOf(walletAddress)
            setBalance(balance.displayValue)
        }
        if(activetwToken){
            getBalance();
        }
    },[activetwToken])

    const validateAddress = (address) =>{
      if(!address){
        setIsAddressValid(true);
        return;
      }
      setIsAddressValid(ethers.utils.isAddress(address));
    };

// Exchange

    const sendToken = async (amount,recipient) =>{
        console.log("Sending Token.....")

        if (!isAddressValid || !amount || !recipient) {
          console.error("Invalid input. Check recipient and amount.")
          return;
      }

        try{
            setAction('Transferring')
            const ex = await activetwToken.erc20.transfer(recipient,amount)
            console.log("Transaction Successful:", ex);

            setAction('Transferred');
        }
        catch(error){
            console.error('Transaction failed.', error);
        }
    }

    return(
        <Wrapper>
            <Amount>
                <FlexInputContainer>
                    <FlexInput placeholder="0" type="number" value={amount} 
                    onChange={(e) => setAmount(e.target.value) }/>
                    <span>{selectedToken.symbol}</span>
                </FlexInputContainer>
                {!amount && <Warning style={{color:amount && '#0a0b0d'}}> Amount is a required field </Warning>}
            </Amount>

            <TransferForm>
                <Row>
                    <FieldName>To</FieldName>
                    <Icon>
                        <FaWallet/>
                    </Icon>
                    <Recipient placeholder="Address"  
                    value={recipient} 
                    onChange={e => {setRecipient(e.target.value)
                                    validateAddress(e.target.value);
                    }}/>
                </Row>
                {!isAddressValid && recipient && (
                      <Warning style={{ color: "red", marginTop: "0.5rem", textAlign: "center" }}>
                        Invalid wallet address
                      </Warning>
                  )}
                <Divider/>
                <Row>
                    <FieldName>Pay with</FieldName>
                    <CoinSelectList onClick={() => setAction('select')}>
                        <Icon>
                            <img src= {imageUrl} alt="" />
                        </Icon>
                        <CoinName>{selectedToken.name}</CoinName>
                    </CoinSelectList>
                </Row>
            </TransferForm>

            <Row>
            <Continue 
                  onClick={() => sendToken(amount, recipient)}
                  disabled={!isAddressValid || !amount}  // Button is disabled when necessary
                  style={{ opacity: (!isAddressValid || !amount) ? 0.5 : 1 }} // Visual feedback
            >
                Continue
            </Continue>
            </Row>
            <Row>
                <BalanceTitle>{selectedToken.symbol} Balance</BalanceTitle>
                <Balance>{balance} {selectedToken.symbol} </Balance>
            </Row>
        </Wrapper>
        
    )
}

export default Transfer

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`

const TransferForm = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
`

const Amount = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const FlexInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`

const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #3773f5;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

   &[type=number] {
    -moz-appearance: textfield;
  }
`
const Warning = styled.div`
  /* TRouBLe */
  padding: 1rem 0 2rem 0;
  text-align: center;
  color: #8a919e;
`
const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8a919e;
  padding: 1rem 0;
  font-size: 1.2rem;
`
const FieldName = styled.div`
  flex: 0.5;
  padding-left: 2rem;
`

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`

const Recipient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`

const CoinSelectList = styled.div`
  display: flex;
  flex: 1.3;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`

const CoinName = styled.div`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`

const Continue = styled.button`
  color: white;
  width: 100%;
  background-color: #3773f5;
  padding: 1rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #4a80f6;
  }
`

const BalanceTitle = styled.div``

const Balance = styled.div``