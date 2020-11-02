import React from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import withCoinListData from "../Container/withCoinListData";
import { useHistory } from "react-router-dom";

const CoinListContainer = styled.div`
  display: none;
  width: 100%;

  @media ${(props) => props.subList || props.theme.desktop} {
    display: block;
    max-width: 400px;
    height: 100%;
    margin-left: 10px;
  }

  @media ${(props) => (props.subList ? props.theme.tablet : true)} {
    display: block;
    height: 140px;
    max-width: 500px;
    background-color: tomato;
    margin-top: 0;
  }

  @media ${(props) => (!props.isRootURL ? props.theme.mobileM : true)} {
    display: none;
  }

  @media ${(props) => (props.isRootURL ? props.theme.tablet : true)} {
    display: block;
  }
`;

const CoinSearchContainer = styled.div`
  display: flex;
  width: 100%;

  border-bottom: 1px solid ${(props) => props.borderColor};
`;

const CoinSearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 5px;
`;

const CoinSearchBtn = styled.button`
  width: 30px;
  height: 30px;
  background: url("https://cdn.upbit.com/images/bg.e801517.png") -90px 2px no-repeat;

  background-color: white;
  padding: 10px;
  padding-right: 25px;
  border: none;
`;

const CoinUl = styled.ul`
  height: 100%;
  max-height: 1310px;
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
  const history = useHistory();
  const isRootURL = history.location.pathname === "/";

  return (
    <CoinListContainer theme={theme} subList={subList} isRootURL={isRootURL}>
      <CoinSearchContainer borderColor={theme.lightGray2}>
        <CoinSearchInput />
        <CoinSearchBtn />
      </CoinSearchContainer>

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
