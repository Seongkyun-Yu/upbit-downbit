import React from "react";
import { useSelector } from "react-redux";

const withOrderbookData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;

  const volume = state.Coin.candle.data[selectedMarket].accTradeVolume;
  const highest52WeekPrice =
    state.Coin.candle.data[selectedMarket].highest52WeekPrice;
  const highest52WeekData =
    state.Coin.candle.data[selectedMarket].highest52WeekDate;
  const lowest52WeekPrice =
    state.Coin.candle.data[selectedMarket].lowest52WeekPrice;
  const lowest52WeekDate =
    state.Coin.candle.data[selectedMarket].lowest52WeekDate;

  const orderbook = state.Coin.orderbook.data[selectedMarket];
  const totalData = {
    totalBidSize: orderbook.total_bid_size,
    totalAskSize: orderbook.total_ask_size,
  };

  const bidOrderbookData = [];
  const askOrderbookData = [];

  // 호가 데이터 분리 정렬
  orderbook.orderbook_units.forEach((orderbook) => {
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
      totalData={totalData}
      bidOrderbookData={bidOrderbookData}
      askOrderbookData={askOrderbookData}
    />
  ) : (
    <div>Orderbook Loading</div>
  );
};

export default withOrderbookData;
