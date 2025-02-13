import styled from 'styled-components';

const promoData = [
    {
        title: "High-Yield Savings",
        description: "Earn up to 5% APY on stablecoins and maximize your returns.",
        additional: "$0.000142",
        highlight: "5% APY",
        highlightColor: "#27ad75",
        url: "https://www.blockfi.com/" 
    },
    {
        title: "Crypto Quests",
        description: "Complete learning modules and earn free cryptocurrency rewards.",
        additional: "Start Learning",
        highlightColor: "#3773f5",
        url: "https://www.coinbase.com/earn" 
    },
    {
        title: "NFT Staking",
        description: "Stake your NFTs to earn exclusive rewards and bonuses.",
        additional: "Stake Now",
        highlightColor: "#f5a623",
        url: "https://www.binance.com/en/nft" 
    }
];

const Promos = () => {
  return (
    <Wrapper>
      {promoData.map((promo, index) => (
        <OfferCard key={index} onClick={() => window.open(promo.url, '_blank')}>
          <Title>{promo.title}</Title>
          <Description>{promo.description}</Description>
          <Spacer />
          <Additional style={{ color: promo.highlightColor }}>
            {promo.additional}
            {promo.highlight && <span>{promo.highlight}</span>}
          </Additional>
        </OfferCard>
      ))}
    </Wrapper>
  );
};

export default Promos;

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OfferCard = styled.div`
  width: 21rem;
  height: auto;
  border: 1px solid #282b2f;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background-color: #121212;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    border-color: #3773f5;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  font-size: 1.1rem;
  color: #8a919e;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Additional = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: #8a919e;
    font-size: 1rem;
  }
`;
