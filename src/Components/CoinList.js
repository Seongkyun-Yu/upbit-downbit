import React from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import withCoinListData from "../Container/withCoinListData";

const CoinListContainer = styled.div`
  display: none;
  width: 100%;
  /* margin-top: 10px; */

  @media ${(props) => props.subList || props.theme.desktop} {
    display: block;
    max-width: 400px;
    height: 100%;
  }

  @media ${(props) => (props.subList ? props.theme.tablet : true)} {
    display: block;
    height: 130px;
    margin-top: 0;
  }
`;
const CoinUl = styled.ul`
  height: 100%;
  max-height: 1250px;
  overflow-y: scroll;
  scrollbar-color: ${(props) => props.scrollColor};
  scrollbar-width: thin;
  scrollbar-base-color: ${(props) => props.scrollColor};
  &::-webkit-scrollbar {
    width: 5px;
    background-color: white;
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
  subList,
}) => {
  return (
    <CoinListContainer theme={theme} subList={subList}>
      <CoinUl scrollColor={theme.middleGray}>
        {marketNamesArr.map((marketName) => {
          const splitedName = marketName.split("-");
          const enCoinName = splitedName[1] + "/" + splitedName[0];
          const changePrice24Hour = coinListDatas[marketName].changePrice24Hour;
          const fontColor =
            +changePrice24Hour > 0
              ? theme.priceUp
              : +changePrice24Hour < 0
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
              changeRate24Hour={
                (
                  Math.round(
                    coinListDatas[marketName].changeRate24Hour * 10000
                  ) / 100
                ).toFixed(2) + "%"
              }
              changePrice24Hour={coinListDatas[marketName].changePrice24Hour}
              tradePrice24Hour={Math.floor(
                coinListDatas[marketName].tradePrice24Hour / 1000000
              )}
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
