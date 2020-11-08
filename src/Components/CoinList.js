import React from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import withCoinListData from "../Container/withCoinListData";
import { useHistory } from "react-router-dom";
import { searchCoin } from "../Reducer/coinReducer";
import { useDispatch } from "react-redux";
import withThemeData from "../Container/withThemeData";
import withSelectedCoinPrice from "../Container/withSelectedCoinPrice";
import withSelectedOption from "../Container/withSelectedOption";
import withMarketNames from "../Container/withMarketNames";

const St = {
  CoinListContainer: styled.div`
    display: none;
    width: 100%;
    background-color: white;

    @media ${({ theme, subList }) => subList || theme.desktop} {
      display: block;
      max-width: 400px;
      height: 1250px;
      margin-left: 10px;
    }

    @media ${({ theme, subList }) => (subList ? theme.tablet : true)} {
      display: block;
      height: 140px;
      max-width: 500px;
      background-color: tomato;
      margin-top: 0;
    }

    @media ${({ theme, isRootURL }) => (!isRootURL ? theme.mobileM : true)} {
      display: none;
    }

    @media ${({ theme, isRootURL }) => (isRootURL ? theme.tablet : true)} {
      display: block;
    }
  `,

  CoinSearchContainer: styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
  `,

  CoinSearchInput: styled.input`
    width: 100%;
    border: none;
    padding: 5px;
  `,

  CoinSearchBtn: styled.button`
    width: 30px;
    height: 30px;
    background: url("https://cdn.upbit.com/images/bg.e801517.png") -83px 2px no-repeat;
    background-color: white;
    padding: 10px;
    padding-right: 20px;
    padding-left: 20px;
    border: none;
  `,

  CoinSortContainer: styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
    font-size: 0.9rem;
    font-weight: 800;
    color: #666666;
  `,

  CoinSortList: styled.li`
    width: ${({ width }) => width || "20%"};
    text-align: ${({ textAlign }) => textAlign || "right"};
    margin-right: ${({ marginRight }) => marginRight || 0};
    font-size: 0.78rem;
  `,

  CoinUl: styled.ul`
    height: 100%;
    background-color: white;
    overflow-y: scroll;
    scrollbar-color: ${({ theme }) => theme.middleGray};
    scrollbar-width: thin;
    scrollbar-base-color: ${({ theme }) => theme.middleGray};
    &::-webkit-scrollbar {
      width: 5px;
      background-color: white;
      border-radius: 5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.middleGray};
      border-radius: 5rem;
    }
  `,
};

const CoinList = ({
  theme,
  marketNames,
  sortedMarketNames,
  coinListDatas,
  selectedMarket,
  subList,
  searchCoinInput,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isRootURL = history.location.pathname === "/";

  return (
    <St.CoinListContainer subList={subList} isRootURL={isRootURL}>
      <St.CoinSearchContainer>
        <St.CoinSearchInput
          onChange={(e) => dispatch(searchCoin(e.target.value))}
          value={searchCoinInput}
        />
        <St.CoinSearchBtn />
      </St.CoinSearchContainer>
      <St.CoinSortContainer>
        <St.CoinSortList width={"50px"} />
        <St.CoinSortList textAlign={"left"}>한글명</St.CoinSortList>
        <St.CoinSortList>현재가</St.CoinSortList>
        <St.CoinSortList>상승률</St.CoinSortList>
        <St.CoinSortList width={"25%"} marginRight={"10px"}>
          거래대금
        </St.CoinSortList>
      </St.CoinSortContainer>

      <St.CoinUl>
        {sortedMarketNames.map((marketName) => {
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
              coinName={marketNames[marketName].korean}
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
      </St.CoinUl>
    </St.CoinListContainer>
  );
};

export default React.memo(
  withCoinListData()(
    React.memo(
      withMarketNames()(
        React.memo(
          withSelectedOption()(
            React.memo(withThemeData()(React.memo(CoinList)))
          )
        )
      )
    )
  )
);
