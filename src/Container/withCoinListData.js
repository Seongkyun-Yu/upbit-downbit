import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { choHangul } from "../Lib/utils";
import * as Hangul from "hangul-js";

// const withCoinListData = () => (OriginalComponent) => (props) => {
//   const state = useSelector((state) => state);
//   const coinListDatas = state.Coin.candle.data; // 코인들 데이터

//   // return Object.keys(coinListDatas).length > 1 ? (
//   //   <OriginalComponent {...props} coinListDatas={coinListDatas} />
//   // ) : (
//   //   <div>loading</div>
//   // );
//   return <OriginalComponent {...props} coinListDatas={coinListDatas} />;
// };

const withCoinListData = () => (OriginalComponent) => (props) => {
  const theme = useContext(ThemeContext); // 테마 정보
  // const state = useSelector((state) => state);
  // const coinState = useSelector((state) => state.Coin);
  const marketNames = useSelector((state) => state.Coin.marketNames.data); // 코인 마켓 이름들(객체)

  let sortedMarketNames = Object.keys(marketNames); // 코인 마켓 이름 배열화

  const coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
  const coinSearchInputData = useSelector((state) => state.Coin.searchCoin); // 검색한 코인 이름

  // 데이터 받는 데 성공하면 필터링 및 정렬한다
  if (Object.keys(coinListDatas).length > 1) {
    // 검색 기준 필터링
    sortedMarketNames = sortedMarketNames.filter(
      (coin) =>
        // 영어 검색
        marketNames[coin].english
          .toLowerCase()
          .includes(coinSearchInputData.toLowerCase()) ||
        // 코인 심볼 검색
        coin
          .split("-")[1]
          .toLowerCase()
          .includes(coinSearchInputData.toLowerCase()) ||
        // 한글 검색
        Hangul.disassembleToString(marketNames[coin].korean).includes(
          Hangul.disassembleToString(coinSearchInputData)
        ) ||
        // 초성 검색
        choHangul(marketNames[coin].korean).includes(coinSearchInputData)
    );

    // 정렬
    sortedMarketNames = sortedMarketNames.sort((coin1, coin2) => {
      return (
        +coinListDatas[coin2].tradePrice24Hour -
        +coinListDatas[coin1].tradePrice24Hour
      );
    });
  }

  const latestCoinData = {};

  if (Object.keys(coinListDatas).length > 2) {
    Object.keys(coinListDatas).forEach((marketName) => {
      latestCoinData[marketName] = {};
      latestCoinData[marketName].price =
        coinListDatas[marketName].candles[
          coinListDatas[marketName].candles.length - 1
        ].close;

      latestCoinData[marketName].changeRate24Hour = (
        Math.round(coinListDatas[marketName].changeRate24Hour * 10000) / 100
      ).toFixed(2);

      latestCoinData[marketName].changePrice24Hour =
        coinListDatas[marketName].changePrice24Hour;

      latestCoinData[marketName].tradePrice24Hour = Math.floor(
        coinListDatas[marketName].tradePrice24Hour / 1000000
      );
    });
  }

  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const searchCoinInput = useSelector((state) => state.Coin.searchCoinInput);

  return (
    <OriginalComponent
      {...props}
      theme={theme}
      marketNames={marketNames}
      sortedMarketNames={sortedMarketNames}
      // coinListDatas,
      latestCoinData={latestCoinData}
      selectedMarket={selectedMarket}
      searchCoinInput={searchCoinInput}
    />
  );
};

export default withCoinListData;
