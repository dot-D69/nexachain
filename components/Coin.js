import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";

const Coin = ({ coin }) => {
  return (
    <Wrapper>
      <Row>
        <Column style={{ flex: 3, textAlign: "left" }}>
          <NameCol>
            <CoinIcon>
              <Image src={coin.logo} alt={coin.name} />
            </CoinIcon>
            <div>
              <Primary>{coin.name}</Primary>
              <Secondary>{coin.sign}</Secondary>
            </div>
          </NameCol>
        </Column>
        <Column style={{ flex: 2, textAlign: "right" }}>
          <Primary>
            {"$"}
            {coin.balanceUsd}
          </Primary>
          <Secondary>
            {coin.balanceCoin} {coin.sign}
          </Secondary>
        </Column>
        <Column style={{ flex: 1.5, textAlign: "right" }}>
          <Primary>
            {"$"}
            {coin.priceUsd}
          </Primary>
          <ChangeText color={coin.change < 0 ? "red" : "green"}>
            {coin.change > 0 && "+"}
            {coin.change}%
          </ChangeText>
        </Column>
        <Column style={{ flex: 1, textAlign: "right" }}>{coin.allocation}%</Column>
        <Column style={{ flex: 0.5, textAlign: "center", minWidth: "20px" }}>
          <BsThreeDotsVertical />
        </Column>
      </Row>
    </Wrapper>
  );
};

export default Coin;

/* ----------------- Styled Components ----------------- */

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Column = styled.div`
  color: #c7cbd6;
`;

const NameCol = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 1.8rem;
  margin-right: 1rem;
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
  font-weight: bold;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
`;

const ChangeText = styled.div`
  color: ${(props) => props.color};
`;
