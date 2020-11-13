import React from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import { useHistory } from "react-router-dom";
import { searchCoin } from "../Reducer/coinReducer";
import { useDispatch } from "react-redux";
import withThemeData from "../Container/withThemeData";
import withSelectedOption from "../Container/withSelectedOption";
import withMarketNames from "../Container/withMarketNames";
import Loading from "../styles/Loading";
import isEqual from "react-fast-compare";
import withLatestCoinData from "../Container/withLatestCoinData";

const St = {
  CoinListContainer: styled.div`
    display: none;
    width: 100%;
    background-color: white;
    /* margin: 0 auto; */
    overflow: hidden;

    @media ${({ theme }) => theme.desktop} {
      display: block;
      max-width: 400px;
      height: 1305px;
      margin-left: 10px;
    }

    @media ${({ theme, isRootURL }) => (!isRootURL ? theme.mobileM : true)} {
      display: none;
    }

    @media ${({ theme, isRootURL }) => (isRootURL ? theme.tablet : true)} {
      display: block;
      margin-top: 0;
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
    height: 1305px;
    min-height: 800px;
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
  latestCoinData,
  selectedMarket,
  searchCoinInput,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isRootURL = history.location.pathname === "/";

  return (
    <St.CoinListContainer isRootURL={isRootURL}>
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
        {Object.keys(latestCoinData).length > 2 ? (
          sortedMarketNames.map((marketName) => {
            const splitedName = marketName.split("-");
            const enCoinName = splitedName[1] + "/" + splitedName[0];
            const changePrice24Hour =
              latestCoinData[marketName].changePrice24Hour;
            const changeRate24Hour =
              latestCoinData[marketName].changeRate24Hour;
            const tradePrice24Hour =
              latestCoinData[marketName].tradePrice24Hour;
            const price = latestCoinData[marketName].price;
            const isTraded = latestCoinData[marketName].isTraded;

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
                price={price}
                changeRate24Hour={changeRate24Hour + "%"}
                changePrice24Hour={changePrice24Hour}
                tradePrice24Hour={tradePrice24Hour}
                isTraded={isTraded}
                key={`coinList-${marketName}`}
              />
            );
          })
        ) : (
          <Loading center={false} />
        )}
      </St.CoinUl>
    </St.CoinListContainer>
  );
};

export default withLatestCoinData()(
  withMarketNames()(withSelectedOption()(withThemeData()(React.memo(CoinList))))
);
