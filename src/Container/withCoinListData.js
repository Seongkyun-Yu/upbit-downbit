import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import * as Hangul from "hangul-js";
import { choHangul } from "../Lib/utils";

const withCoinListData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const marketNames = state.Coin.marketNames.data; // 코인 마켓 이름들(객체)
  let marketNamesArr = Object.keys(marketNames); // 코인 마켓 이름 배열화
  const coinListDatas = state.Coin.candle.data; // 코인들 데이터
  const selectedMarket = state.Coin.selectedMarket; // 선택된 마켓 이름
  const theme = useContext(ThemeContext); // 테마 정보
  const coinSearchInputData = state.Coin.searchCoin; // 검색한 코인 이름

  // 데이터 받는 데 성공하면 필터링 및 정렬한다
  if (Object.keys(coinListDatas).length > 1) {
    // 검색 기준 필터링
    marketNamesArr = marketNamesArr.filter(
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
    marketNamesArr = marketNamesArr.sort((coin1, coin2) => {
      return (
        +coinListDatas[coin2].tradePrice24Hour -
        +coinListDatas[coin1].tradePrice24Hour
      );
    });
  }

  return Object.keys(coinListDatas).length > 1 ? (
    <OriginalComponent
      {...props}
      marketNames={marketNames}
      marketNamesArr={marketNamesArr}
      coinListDatas={coinListDatas}
      selectedMarket={selectedMarket}
      theme={theme}
      coinSearchInputData={coinSearchInputData}
    />
  ) : (
    <div>loading</div>
  );
};

export default withCoinListData;
