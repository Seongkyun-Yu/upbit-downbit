import React from "react";
import { useSelector } from "react-redux";

const withOrderbookData = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const orderbook = useSelector(
    (state) => state.Coin.orderbook.data[selectedMarket]
  );
  const totalData = {
    totalBidSize: orderbook.total_bid_size,
    totalAskSize: orderbook.total_ask_size,
  };

  const buyOrderbookData = [];
  const sellOrderbookData = [];

  orderbook.orderbook_units.forEach((orderbook) => {
    sellOrderbookData.push({
      askPrice: orderbook.ask_price,
      askSize: orderbook.ask_size,
    });

    buyOrderbookData.push({
      askPrice: orderbook.ask_price,
      askSize: orderbook.ask_size,
    });
  });

  return orderbook.orderbook_units.length ? (
    <OriginalComponent
      totalData={totalData}
      buyOrderbookData={buyOrderbookData}
      sellOrderbookData={sellOrderbookData}
    />
  ) : (
    <div>Orderbook Loading</div>
  );
};

export default withOrderbookData;
