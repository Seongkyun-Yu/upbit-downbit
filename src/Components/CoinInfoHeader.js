import React from "react";
import styled from "styled-components";
import withCoinInfoData from "../Container/withCoinInfoData";

const CoinInfoContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 99%;
  background-color: white;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  border-bottom: 1px solid ${(props) => props.borderColor};
  /* margin-right: 10px; */
`;

const CoinInfoMain = styled.div`
  display: flex;
  align-items: center;
  min-width: 450px;
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
  padding: 0 8px 0 13px;
`;

const CoinName = styled.strong`
  font-size: 1.7rem;
  font-weight: 1500;
  color: #2b2b2b;
`;

const CoinMarketName = styled.span`
  display: flex;
  font-size: 0.9rem;
  flex-direction: column;
  padding-left: 5px;
  margin-top: 7px;
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

const ChangeContainer = styled.span`
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

const TradeInfoContainer = styled.dl`
  display: flex;
  justify-content: flex-end;
  width: 45%;
  min-width: 340px;
  height: 100%;
  margin: 0 10px 0 0;
`;

const InfoContainer = styled.div`
  /* width: 50%; */
  height: 100%;
  margin-left: 15px;
`;

const TradeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
  min-width: ${(props) => props.minWidth || "none"};
  border-bottom: 1px solid ${(props) => props.borderColor || "none"};
  padding: 5px 0 5px 0;
  font-size: 0.8rem;
`;

const TradeDT = styled.dt`
  display: inline-block;
  min-width: 50px;
  height: 50%;
`;

const TradeDD = styled.dd`
  margin: 0;
  display: inline-block;
  height: 50%;
  color: ${(props) => props.fontColor || "black"};
  font-weight: ${(props) => props.fontWeight || 500};
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
      <CoinInfoMain>
        <CoinLogo coinNameEn={coinNameEn} />
        <CoinNameContainer>
          <CoinName>{coinNameKor}</CoinName>
          <CoinMarketName>{coinNameAndMarketEng}</CoinMarketName>
        </CoinNameContainer>
        <PriceInfo>
          <Price priceColor={priceColor}>
            {price}
            <PriceUnit priceColor={priceColor}>KRW</PriceUnit>
          </Price>
          <ChangeContainer>
            전일대비
            <ChangeRate priceColor={priceColor}>{changeRate24Hour}%</ChangeRate>
            <ChangePrice priceColor={priceColor}>
              {changePrice24Hour}
            </ChangePrice>
          </ChangeContainer>
        </PriceInfo>
      </CoinInfoMain>
      <TradeInfoContainer>
        <InfoContainer>
          <TradeInfo borderColor={theme.lightGray2}>
            <TradeDT>고가</TradeDT>
            <TradeDD fontColor={theme.priceUp} fontWeight={800}>
              {highestPrice24Hour}
            </TradeDD>
          </TradeInfo>
          <TradeInfo>
            <TradeDT borderColor={theme.lightGray2}>저가</TradeDT>
            <TradeDD fontColor={theme.priceDown} fontWeight={800}>
              {lowestPrice24Hour}
            </TradeDD>
          </TradeInfo>
        </InfoContainer>
        <InfoContainer>
          <TradeInfo minWidth={"220px"} borderColor={theme.lightGray2}>
            <TradeDT>거래량(24h)</TradeDT>
            <TradeDD>{`${volumeDay} ${coinNameEn}`}</TradeDD>
          </TradeInfo>
          <TradeInfo minWidth={"220px"}>
            <TradeDT borderColor={theme.lightGray2}>거래대금(24h)</TradeDT>
            <TradeDD>{changeTradePriceDay} KRW</TradeDD>
          </TradeInfo>
        </InfoContainer>
      </TradeInfoContainer>
    </CoinInfoContainer>
  );
};

const CoinInfoHeaderMemo = React.memo(CoinInfoHeader);

export default withCoinInfoData()(CoinInfoHeaderMemo);
