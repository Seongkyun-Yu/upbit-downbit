import { style } from "d3-selection";
import React from "react";
import styled from "styled-components";
import withCoinInfoData from "../Container/withCoinInfoData";

const CoinInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 99%;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  border-bottom: 1px solid ${(props) => props.borderColor};
  /* margin-right: 10px; */
`;

const CoinLogo = styled.i`
  display: inline-block;
  width: 35px;
  height: 35px;
  background-image: ${(props) =>
    `url(https://static.upbit.com/logos/${props.coinNameEn}.png)`};
  background-size: cover;
  margin-left: 5px;
`;

const CoinNameContainer = styled.div`
  padding: 0 8px 0 10px;
`;

const CoinName = styled.strong`
  font-size: 1.78rem;
  font-weight: 1500;
  color: #2b2b2b;
`;

const CoinMarketName = styled.span`
  display: flex;
  font-size: 0.9rem;
  flex-direction: column;
  padding-left: 5px;
  padding-top: 6px;
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
  padding-left: 5px;
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
    <CoinInfoContainer borderColor={theme.lightGray2}>
      <CoinLogo coinNameEn={coinNameEn} />
      <CoinNameContainer>
        <CoinName>{coinNameKor}</CoinName>
        <CoinMarketName>{coinNameEn}/KRW</CoinMarketName>
      </CoinNameContainer>
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
