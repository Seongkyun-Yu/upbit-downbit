import React from "react";
import { useSelector } from "react-redux";

const withOrderbookData = () => (OriginalComponent) => (props) => {
  // const theme = useContext(ThemeContext); // 테마 정보
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;

  // const volume24 = Math.floor(selectedCoinData.volume24Hour);
  // const highestPrice52Week = selectedCoinData.highestPrice52Week;
  // const highestDate52Week = selectedCoinData.highestDate52Week;
  // const lowestPrice52Week = selectedCoinData.lowestPrice52Week;
  // const lowestDate52Week = selectedCoinData.lowestDate52Week;
  // const tradePrice24 = Math.floor(selectedCoinData.tradePrice24Hour / 1000000);
  // const lastCandleIndex = selecteCoinCadnles.length - 1;

  // const beforeDayPrice = selecteCoinCadnles.length
  //   ? selecteCoinCadnles[lastCandleIndex].close -
  //     selectedCoinData.changePrice24Hour
  //   : 0;

  const orderbook = state.Coin.orderbook.data[selectedMarket];
  const totalData = {
    totalBidSize: orderbook.total_bid_size,
    totalAskSize: orderbook.total_ask_size,
  };

  const bidOrderbookData = [];
  const askOrderbookData = [];

  let maxOrderSize = 0;
  // 호가 데이터 분리 정렬
  orderbook.orderbook_units.forEach((orderbook, i) => {
    const bidSize = orderbook.bid_size.toFixed(3);
    const askSize = orderbook.ask_size.toFixed(3);
    maxOrderSize = Math.max(maxOrderSize, bidSize, askSize);

    if (i < 8) {
      // 8개씩 자름
      bidOrderbookData.push({
        bidPrice: orderbook.bid_price,
        bidSize: orderbook.bid_size.toFixed(3),
      });
      askOrderbookData.push({
        askPrice: orderbook.ask_price,
        askSize: orderbook.ask_size.toFixed(3),
      });
    }
  });

  const orderbookData = [...askOrderbookData, ...bidOrderbookData];

  // 매도 호가창은 가격 내림차순으로 정렬해줌 (매수는 원래 가격 내림차순임)
  askOrderbookData.sort((book1, book2) => +book2.askPrice - +book1.askPrice);

  return orderbook.orderbook_units.length ? (
    <OriginalComponent
      {...props}
      // theme={theme}
      totalData={totalData}
      orderbookData={orderbookData}
      bidOrderbookData={bidOrderbookData}
      askOrderbookData={askOrderbookData}
      maxOrderSize={maxOrderSize}
      // volume24={volume24}
      // highestPrice52Week={highestPrice52Week}
      // highestDate52Week={highestDate52Week}
      // lowestPrice52Week={lowestPrice52Week}
      // lowestDate52Week={lowestDate52Week}
      // tradePrice24={tradePrice24}
      // beforeDayPrice={beforeDayPrice}
    />
  ) : (
    <div>Orderbook Loading</div>
  );
};

export default withOrderbookData;
