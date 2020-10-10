import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const withOrderbookData = () => (OriginalComponent) => (props) => {
  const theme = useContext(ThemeContext); // 테마 정보
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;
  const selectedCoinData = state.Coin.candle.data[selectedMarket];
  const selecteCoinCadnles = selectedCoinData.candles;

  const volume24 = Math.floor(selectedCoinData.accTradeVolume);
  const highest52WeekPrice = selectedCoinData.highest52WeekPrice;
  const highest52WeekDate = selectedCoinData.highest52WeekDate;
  const lowest52WeekPrice = selectedCoinData.lowest52WeekPrice;
  const lowest52WeekDate = selectedCoinData.lowest52WeekDate;
  const tradePrice24 = Math.floor(selectedCoinData.accTradePrice / 1000000);
  const lastCandleIndex = selecteCoinCadnles.length - 1;

  const beforeDayPrice = selecteCoinCadnles.length
    ? selecteCoinCadnles[lastCandleIndex].close - selectedCoinData.changePrice
    : 0;

  const orderbook = state.Coin.orderbook.data[selectedMarket];
  const totalData = {
    totalBidSize: orderbook.total_bid_size,
    totalAskSize: orderbook.total_ask_size,
  };

  const bidOrderbookData = [];
  const askOrderbookData = [];

  let maxOrderSize = 0;
  // 호가 데이터 분리 정렬
  orderbook.orderbook_units.forEach((orderbook) => {
    const bidSize = orderbook.bid_size.toFixed(3);
    const askSize = orderbook.ask_size.toFixed(3);
    maxOrderSize = Math.max(maxOrderSize, bidSize, askSize);
    bidOrderbookData.push({
      bidPrice: orderbook.bid_price,
      bidSize: orderbook.bid_size.toFixed(3),
    });

    askOrderbookData.push({
      askPrice: orderbook.ask_price,
      askSize: orderbook.ask_size.toFixed(3),
    });
  });

  // 매도 호가창은 가격 내림차순으로 정렬해줌 (매수는 원래 가격 내림차순임)
  askOrderbookData.sort((book1, book2) => +book2.askPrice - +book1.askPrice);

  return orderbook.orderbook_units.length ? (
    <OriginalComponent
      theme={theme}
      totalData={totalData}
      bidOrderbookData={bidOrderbookData}
      askOrderbookData={askOrderbookData}
      maxOrderSize={maxOrderSize}
      volume24={volume24}
      highest52WeekPrice={highest52WeekPrice}
      highest52WeekDate={highest52WeekDate}
      lowest52WeekPrice={lowest52WeekPrice}
      lowest52WeekDate={lowest52WeekDate}
      tradePrice24={tradePrice24}
      beforeDayPrice={beforeDayPrice}
    />
  ) : (
    <div>Orderbook Loading</div>
  );
};

export default withOrderbookData;
