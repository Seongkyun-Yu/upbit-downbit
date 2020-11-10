import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const withOrderbookData = () => (OriginalComponent) => (props) => {
  // const theme = useContext(ThemeContext); // 테마 정보

  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;

  // const selectedCoinData = state.Coin.candle.data[selectedMarket];
  // const selecteCoinCadnles = selectedCoinData.candles;
  // const lastCandleIndex = selecteCoinCadnles.length - 1;

  // const beforeDayPrice = selecteCoinCadnles.length
  //   ? selecteCoinCadnles[lastCandleIndex].close -
  //     selectedCoinData.changePrice24Hour
  //   : 0;

  let totalData;
  let bidOrderbookData;
  let askOrderbookData;
  let orderbookData;
  let maxOrderSize = 0;

  const orderbook = state.Coin.orderbook.data[selectedMarket];
  // console.log(orderbook);
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

  // return orderbook ? (
  //   <OriginalComponent
  //     {...props}
  //     totalData={totalData || []}
  //     orderbookData={orderbookData || []}
  //     bidOrderbookData={bidOrderbookData || []}
  //     askOrderbookData={askOrderbookData || []}
  //     maxOrderSize={maxOrderSize || 0}
  //     // beforeDayPrice={beforeDayPrice}
  //     // theme={theme}
  //   />
  // ) : (
  //   <div>Orderbook Loading</div>
  // );

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
