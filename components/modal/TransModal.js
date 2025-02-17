import React, { useState } from "react";
import styled from "styled-components"; 
import Transfer from"./Transfer";
import CoinSelect from "./CoinSelect";
import { Triangle } from 'react-loader-spinner'
import Receive from './Receive'

const TransModal = ({sanityTokens,thirdWebTokens, walletAddress}) =>{
    const[action,setAction] = useState('send')
    const[selectedToken, setSelectedToken] = useState(sanityTokens[2])

    

    const selectedStyle={
        color: '#3773f5',
        border: '1px solid #3773f5',
    }

    const unselectedStyle = {
        border: '1px solid #282b2f',
    }

    const selectedModal = option =>{
        switch (option) {
            case 'send':
                return <Transfer selectedToken={selectedToken} setAction={setAction} thirdWebTokens={thirdWebTokens} walletAddress = {walletAddress}/>
            case 'receive':
                return (
                    <Receive
                    setAction={setAction}
                    selectedToken={selectedToken}
                    walletAddress={walletAddress}
                    />
                )
            case 'select':
                return( <CoinSelect
                    setAction={setAction}
                    selectedToken={selectedToken}
                    setSelectedToken={setSelectedToken}
                    sanityTokens={sanityTokens}
                    thirdWebTokens={thirdWebTokens}
                    walletAddress={walletAddress}
                />
                )
            case 'Transferring':
                return (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        fontSize: '1.5rem' 
                    }}>
                        <h2>Transaction in Progress...</h2>
                        <Triangle
                            height="80"
                            width="80"
                            radius="9"
                            color="#3773f5"
                            ariaLabel="loading"
                            wrapperStyle={{ display: 'flex', justifyContent: 'center' }} // Corrected
                        />
                    </div>
                );

            case 'Transferred':
                return (
                    <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: '#27ad75',
                    }}
                    >
                    Transaction Complete
                    </div>
                )
            default:
                return <h2> send </h2>
        }
    }

    return(
        <Wrapper>
            <Selector>
                <Option style={action === 'send' ? selectedStyle : unselectedStyle} 
                    onClick={() => setAction('send')}>
                <p style={{ color: action === 'send' ? '#3773f5' : 'white' }}>Send</p>
                </Option>
                <Option style={action === 'receive' ? selectedStyle : unselectedStyle} 
                    onClick={() => setAction('receive')}>  
                <p style={{ color: action === 'receive' ? '#3773f5' : 'white' }}>Receive</p>
                </Option>
            </Selector>
            <ModalMain>
                {selectedModal(action)}
            </ModalMain>
        </Wrapper>
    )
}

export default TransModal

const Wrapper = styled.div`
    height: 35rem;
    width: 27rem;
    color: white;
    border: 1px solid #282b2f;
    display: flex;
    flex-direction: column;
`

const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
`

const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`
const ModalMain  = styled.div`
    padding: 1rem;
    flex:1;
`