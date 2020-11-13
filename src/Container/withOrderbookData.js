import React from "react";
import { useSelector } from "react-redux";

const withOrderbookData = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const orderbook = useSelector(
    (state) => state.Coin.orderbook.data[selectedMarket]
  );

  let totalData;
  let bidOrderbookData;
  let askOrderbookData;
  let orderbookData;
  let maxOrderSize = 0;

  if (orderbook) {
    totalData = {
      totalBidSize: orderbook.total_bid_size,
      totalAskSize: orderbook.total_ask_size,
    };

    bidOrderbookData = [];
    askOrderbookData = [];

    // let maxOrderSize = 0;
    // 호가 데이터 분리 정렬
    orderbook.orderbook_units.forEach((orderbook, i) => {
      const bidSize = orderbook.bid_size.toFixed(3);
      const askSize = orderbook.ask_size.toFixed(3);

      bidOrderbookData.push({
        bidPrice: orderbook.bid_price,
        bidSize: orderbook.bid_size.toFixed(3),
      });
      askOrderbookData.push({
        askPrice: orderbook.ask_price,
        askSize: orderbook.ask_size.toFixed(3),
      });
      maxOrderSize = Math.max(maxOrderSize, bidSize, askSize);
    });

    orderbookData = [...askOrderbookData, ...bidOrderbookData];
    // 매도 호가창은 가격 내림차순으로 정렬해줌 (매수는 원래 가격 내림차순임)
    askOrderbookData.sort((book1, book2) => +book2.askPrice - +book1.askPrice);
  }

  return (
    <OriginalComponent
      {...props}
      totalData={totalData || []}
      orderbookData={orderbookData || []}
      bidOrderbookData={bidOrderbookData || []}
      askOrderbookData={askOrderbookData || []}
      maxOrderSize={maxOrderSize || 0}
    />
  );
};

export default withOrderbookData;
