import React from "react";
import Orderbook from "../Components/Orderbook";
import withOrderbookData from "./withOrderbookData";
import withSelectedCoinPrice from "./withSelectedCoinPrice";
import withThemeData from "./withThemeData";

const OrderbookContainer = () => {
  const OrderbookWithData = withOrderbookData()(
    withSelectedCoinPrice()(withThemeData()(Orderbook))
  );
  return <OrderbookWithData />;
};

export default OrderbookContainer;
