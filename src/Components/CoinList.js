import React from "react";
import styled from "styled-components";
import withCoinListData from "./withCoinListData";

const CoinListContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400px;
  max-height: 780px;
  /* overflow: scroll; */
`;
const CoinUl = styled.ul`
  height: 100%;
  max-height: 780px;
  border: 1px solid silver;
  overflow-y: scroll;
  scrollbar-color: ${(props) => props.scrollColor};
  scrollbar-width: thin;
  scrollbar-base-color: ${(props) => props.scrollColor};
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
    border-radius: 5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.scrollColor};
    border-radius: 5rem;
  }
`;
const CoinLi = styled.li`
  height: 45px;
  border-bottom: 1px solid ${(props) => props.middleGray};
  &:last-child {
    border-bottom: none;
  }
  background-color: ${(props) => props.bgColor};
`;

const CoinBtn = styled.button`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: left;
`;

const CoinNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 94px;
  height: 45px;
`;

const CoinName = styled.span`
  display: block;
  font-size: 12px;
`;

const Price = styled.strong`
  display: block;
  width: 94px;
  height: 100%;
  text-align: right;
  line-height: 2.5rem;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const ChangRateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 58px;
  height: 100%;
  text-align: right;
`;

const ChangeRate = styled.span`
  display: block;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const ChangePrice = styled.span`
  display: block;
  font-size: 12px;
  color: ${(props) => props.color};
`;

const TradePrice = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  width: 98px;
  height: 100%;
  text-align: right;
`;

const CoinList = ({
  marketNames,
  marketNamesArr,
  coinListDatas,
  selectedMarket,
  theme,
}) => {
  return (
    <CoinListContainer>
      <CoinUl scrollColor={theme.middleGray}>
        {marketNamesArr.map((marketName) => {
          const splitedName = marketName.split("-");
          const enCoinName = splitedName[1] + "/" + splitedName[0];
          const changePrice = coinListDatas[marketName].changePrice;
          const fontColor =
            +changePrice > 0
              ? theme.priceUp
              : +changePrice < 0
              ? theme.priceDown
              : "black";
          return (
            <CoinLi
              middleGray={theme.middleGray}
              bgColor={
                selectedMarket === marketName ? theme.lightGray : "white"
              }
            >
              <CoinBtn>
                <CoinNameContainer>
                  <CoinName>{marketNames[marketName]}</CoinName>
                  <CoinName>{enCoinName}</CoinName>
                </CoinNameContainer>
                <Price color={fontColor}>
                  {
                    coinListDatas[marketName].candles[
                      coinListDatas[marketName].candles.length - 1
                    ].close
                  }
                </Price>
                <ChangRateContainer>
                  <ChangeRate color={fontColor}>
                    {(
                      Math.round(coinListDatas[marketName].changeRate * 10000) /
                      100
                    ).toFixed(2) + "%"}
                  </ChangeRate>
                  <ChangePrice color={fontColor}>
                    {coinListDatas[marketName].changePrice}
                  </ChangePrice>
                </ChangRateContainer>
                <TradePrice>
                  {Math.floor(
                    coinListDatas[marketName].accTradePrice / 1000000
                  ) + " 백만"}
                </TradePrice>
              </CoinBtn>
            </CoinLi>
          );
        })}
      </CoinUl>
    </CoinListContainer>
  );
};

export default withCoinListData()(CoinList);
