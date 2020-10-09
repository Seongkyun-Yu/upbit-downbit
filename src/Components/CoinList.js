import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { startChangeMarketAndData } from "../Reducer/coinReducer";
import CoinListItem from "./CoinListItem";
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
            <CoinListItem
              theme={theme}
              marketName={marketName}
              selectedMarket={selectedMarket}
              coinName={marketNames[marketName]}
              enCoinName={enCoinName}
              fontColor={fontColor}
              price={
                coinListDatas[marketName].candles[
                  coinListDatas[marketName].candles.length - 1
                ].close
              }
              changeRate={
                (
                  Math.round(coinListDatas[marketName].changeRate * 10000) / 100
                ).toFixed(2) + "%"
              }
              changePrice={coinListDatas[marketName].changePrice}
              accTradePrice={
                Math.floor(coinListDatas[marketName].accTradePrice / 1000000) +
                " 백만"
              }
              key={`coinList-${marketName}`}
            />
          );
        })}
      </CoinUl>
    </CoinListContainer>
  );
};

const CoinListMemo = React.memo(CoinList);

export default withCoinListData()(CoinListMemo);
