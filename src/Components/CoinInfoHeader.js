import React from "react";
import styled from "styled-components";
import withCoinInfoData from "../Container/withCoinInfoData";

const CoinInfoContainer = styled.div`
  width: 100%;
  background-color: white;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.strong`
  color: ${(props) => props.priceColor};
  font-size: 2rem;
`;

const PriceUnit = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const ChangeInfo = styled.span`
  font-size: 0.8rem;
  margin-top: 5px;
`;

const ChangeRate = styled.strong`
  font-size: 1rem;
  color: ${(props) => props.priceColor};
  margin: 0 10px 0 5px;
`;

const ChangePrice = styled.strong`
  font-size: 1rem;
  color: ${(props) => props.priceColor};
`;

const CoinInfoHeader = ({
  theme,
  coinNameKor,
  coinNameEn,
  coinNameAndMarketEng,
  highestPrice24Hour,
  lowestPrice24Hour,
  changeRate24Hour,
  changePrice24Hour,
  changeTradePriceDay,
  volumeDay,
  price,
  priceColor,
}) => {
  return (
    <CoinInfoContainer>
      <PriceInfo>
        <Price priceColor={priceColor}>
          {price}
          <PriceUnit priceColor={priceColor}>KRW</PriceUnit>
        </Price>
        <ChangeInfo>
          전일대비
          <ChangeRate priceColor={priceColor}>{changeRate24Hour}%</ChangeRate>
          <ChangePrice priceColor={priceColor}>{changePrice24Hour}</ChangePrice>
        </ChangeInfo>
      </PriceInfo>
    </CoinInfoContainer>
  );
};

export default withCoinInfoData()(React.memo(CoinInfoHeader));
