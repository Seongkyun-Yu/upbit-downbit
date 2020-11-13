import React from "react";
import { useSelector } from "react-redux";

const withLatestCoinData = () => (OriginalComponent) => (props) => {
  const coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
  const tradeListData = useSelector((state) => state.Coin.tradeList.data); // 코인들 거래 리스트

  const nowTimestamp = +new Date();

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

      // 거래될 때 깜빡이는 효과 설정용 변수
      // 100ms 이내에 거래됐고, 이전 거래가와 다른 경우 ASK or BID를 넘기고 아니면 false를 넘김
      latestCoinData[marketName].isTraded =
        tradeListData[marketName] &&
        tradeListData[marketName].length > 2 &&
        nowTimestamp - tradeListData[marketName][0].timestamp < 200 &&
        tradeListData[marketName][0].trade_price !==
          tradeListData[marketName][1].trade_price
          ? tradeListData[marketName][0].ask_bid
          : false;
    });
  }

  return <OriginalComponent {...props} latestCoinData={latestCoinData} />;
};

export default withLatestCoinData;
