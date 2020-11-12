import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import CoinList from "../Components/CoinList";
import Header from "../Components/Header";
import MainChart from "../Components/MainChart";
import Orderbook from "../Components/Orderbook";
import CoinInfoHeader from "../Components/CoinInfoHeader";
import OrderInfo from "../Components/OrderInfo";
import TradeList from "../Components/TradeList";
import { useSelector } from "react-redux";
import { choHangul } from "../Lib/utils";
import * as Hangul from "hangul-js";

const St = {
  MainContentContainer: styled.main`
    display: flex;
    justify-content: center;
    max-width: 1500px;
    margin: 0 auto;
    margin-top: 10px;
    width: 100%;
    height: 100%;

    @media ${({ theme }) => theme.tablet} {
      margin-top: 0;
    }
  `,

  ChartAndTradeContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    max-width: 950px;

    @media ${(props) => (props.isRootURL ? props.theme.tablet : true)} {
      display: none;
    }
  `,
  MainChartContainer: styled.div`
    width: 100%;
    height: 500;
  `,

  TradeInfoContainer: styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
  `,

  TradeOrderContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    min-width: 180px;
    margin-left: 10px;
  `,
};

const Main = ({ match }) => {
  const isRootURL = match.path === "/";

  // const theme = useContext(ThemeContext); // 테마 정보
  // const state = useSelector((state) => state);
  // const coinState = state.Coin;
  // const marketNames = state.Coin.marketNames.data; // 코인 마켓 이름들(객체)

  // let sortedMarketNames = Object.keys(marketNames); // 코인 마켓 이름 배열화

  // const coinListDatas = state.Coin.candle.data; // 코인들 데이터
  // const coinSearchInputData = state.Coin.searchCoin; // 검색한 코인 이름

  // // 데이터 받는 데 성공하면 필터링 및 정렬한다
  // if (Object.keys(coinListDatas).length > 1) {
  //   // 검색 기준 필터링
  //   sortedMarketNames = sortedMarketNames.filter(
  //     (coin) =>
  //       // 영어 검색
  //       marketNames[coin].english
  //         .toLowerCase()
  //         .includes(coinSearchInputData.toLowerCase()) ||
  //       // 코인 심볼 검색
  //       coin
  //         .split("-")[1]
  //         .toLowerCase()
  //         .includes(coinSearchInputData.toLowerCase()) ||
  //       // 한글 검색
  //       Hangul.disassembleToString(marketNames[coin].korean).includes(
  //         Hangul.disassembleToString(coinSearchInputData)
  //       ) ||
  //       // 초성 검색
  //       choHangul(marketNames[coin].korean).includes(coinSearchInputData)
  //   );

  //   // 정렬
  //   sortedMarketNames = sortedMarketNames.sort((coin1, coin2) => {
  //     return (
  //       +coinListDatas[coin2].tradePrice24Hour -
  //       +coinListDatas[coin1].tradePrice24Hour
  //     );
  //   });
  // }

  // const latestCoinData = {};

  // if (Object.keys(coinListDatas).length > 2) {
  //   Object.keys(coinListDatas).forEach((marketName) => {
  //     latestCoinData[marketName] = {};
  //     latestCoinData[marketName].price =
  //       coinListDatas[marketName].candles[
  //         coinListDatas[marketName].candles.length - 1
  //       ].close;

  //     latestCoinData[marketName].changeRate24Hour = (
  //       Math.round(coinListDatas[marketName].changeRate24Hour * 10000) / 100
  //     ).toFixed(2);

  //     latestCoinData[marketName].changePrice24Hour =
  //       coinListDatas[marketName].changePrice24Hour;

  //     latestCoinData[marketName].tradePrice24Hour = Math.floor(
  //       coinListDatas[marketName].tradePrice24Hour / 1000000
  //     );
  //   });
  // }

  // const selectedMarket = coinState.selectedMarket;
  // const searchCoinInput = coinState.searchCoinInput;

  return (
    <>
      <Header />
      <St.MainContentContainer>
        <St.ChartAndTradeContainer isRootURL={isRootURL}>
          <CoinInfoHeader />

          <div // 스타일드 컴포넌트로는 차트 라이브러리 사이즈가 동적으로 설정되지 않아서 할 수 없이 이렇게 선언함
            className="mainChartContainer"
            style={{
              width: "100%",
              height: 500,
            }}
          >
            <MainChart />
          </div>

          <St.TradeInfoContainer>
            <Orderbook />
            <St.TradeOrderContainer>
              <OrderInfo />
              <TradeList />
            </St.TradeOrderContainer>
          </St.TradeInfoContainer>
        </St.ChartAndTradeContainer>

        <CoinList
        // theme={theme}
        // marketNames={marketNames}
        // sortedMarketNames={sortedMarketNames}
        // // coinListDatas,
        // latestCoinData={latestCoinData}
        // selectedMarket={selectedMarket}
        // searchCoinInput={searchCoinInput}
        />
      </St.MainContentContainer>
    </>
  );
};

export default Main;
