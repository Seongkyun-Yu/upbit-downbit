import React from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import withCoinListData from "../Container/withCoinListData";
import { useHistory } from "react-router-dom";
import { searchCoin } from "../Reducer/coinReducer";
import { useDispatch } from "react-redux";

const CoinListContainer = styled.div`
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
`;

const CoinSearchContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray2};
`;

const CoinSearchInput = styled.input`
  width: 100%;
  border: none;
  padding: 5px;
`;

const CoinSearchBtn = styled.button`
  width: 30px;
  height: 30px;
  background: url("https://cdn.upbit.com/images/bg.e801517.png") -83px 2px no-repeat;
  background-color: white;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  border: none;
`;

const CoinSortContainer = styled.ul`
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
`;

const CoinSortList = styled.li`
  width: ${({ width }) => width || "20%"};
  text-align: ${({ textAlign }) => textAlign || "right"};
  margin-right: ${({ marginRight }) => marginRight || 0}; ;
`;

const CoinUl = styled.ul`
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
`;

const CoinList = ({
  marketNames,
  marketNamesArr,
  coinListDatas,
  selectedMarket,
  theme,
  subList,
  coinSearchInputData,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isRootURL = history.location.pathname === "/";

  return (
    <CoinListContainer subList={subList} isRootURL={isRootURL}>
      <CoinSearchContainer>
        <CoinSearchInput
          onChange={(e) => dispatch(searchCoin(e.target.value))}
          value={coinSearchInputData}
        />
        <CoinSearchBtn />
      </CoinSearchContainer>
      <CoinSortContainer>
        <CoinSortList width={"50px"} />
        <CoinSortList textAlign={"left"}>한글명</CoinSortList>
        <CoinSortList>현재가</CoinSortList>
        <CoinSortList>상승률</CoinSortList>
        <CoinSortList width={"25%"} marginRight={"10px"}>
          거래대금
        </CoinSortList>
      </CoinSortContainer>

      <CoinUl>
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
      </CoinUl>
    </CoinListContainer>
  );
};

// const CoinListMemo = React.memo(CoinList);

export default withCoinListData()(React.memo(CoinList));
