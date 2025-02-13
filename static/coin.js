import btcLogo from '../images/btc.png'
import maticLogo from '../images/matic.png'
import dogeLogo from '../images/doge.png'
import ethLogo from '../images/eth.png'
import lunaLogo from '../images/luna.png'
import solLogo from '../images/sol.png'
import UsdtLogo from  '../images/tether-usdt-logo.png'
import BnbLogo from  '../images/Binance-coin-bnb-logo.png'

// Function to generate random percentage change
const getRandomChange = () => (Math.random() * 10 - 5).toFixed(2); // Between -5% and +5%

export const coins = [
  {
    name: 'Bitcoin',
    sign: 'BTC',
    logo: btcLogo,
    balanceUsd: 23000.32,
    balanceCoin: 0.35667736,
    priceUsd: 64732.50, // Updated to real-time BTC value
    change: getRandomChange(),
    allocation: 40.0,
  },
  {
    name: 'Solana',
    sign: 'SOL',
    logo: solLogo,
    balanceUsd: 4500.12,
    balanceCoin: 34.5566,
    priceUsd: 130.24,
    change: getRandomChange(),
    allocation: 20.0,
  },
  {
    name: 'Polygon',
    sign: 'MATIC',
    logo: maticLogo,
    balanceUsd: 1250.65,
    balanceCoin: 1893.42,
    priceUsd: 0.66,
    change: getRandomChange(),
    allocation: 10.0,
  },
  {
    name: 'Ethereum',
    sign: 'ETH',
    logo: ethLogo,
    balanceUsd: 9800.43,
    balanceCoin: 2.645,
    priceUsd: 3704.50,
    change: getRandomChange(),
    allocation: 20.0,
  },
  {
    name: 'Terra',
    sign: 'LUNA',
    logo: lunaLogo,
    balanceUsd: 625.78,
    balanceCoin: 145.23,
    priceUsd: 4.31,
    change: getRandomChange(),
    allocation: 5.0,
  },
  {
    name: 'Dogecoin',
    sign: 'DOGE',
    logo: dogeLogo,
    balanceUsd: 625.10,
    balanceCoin: 5024.12,
    priceUsd: 0.12,
    change: getRandomChange(),
    allocation: 5.0,
  },

  {
    name: 'Tether',
    sign: 'USDT',
    logo: UsdtLogo,
    balanceUsd: 500.00,
    balanceCoin: 500.00,
    priceUsd: 1.00,
    change: getRandomChange(),
    allocation: 10.0,
  },

  {
    name: 'Binance Coin',
    sign: 'BNB',
    logo: BnbLogo,
    balanceUsd: 3200.50,
    balanceCoin: 6.5,
    priceUsd: 492.38,
    change: getRandomChange(),
    allocation: 15.0,
  },
];
