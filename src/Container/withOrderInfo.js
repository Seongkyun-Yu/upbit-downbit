import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useSelector } from "react-redux";

const withOrderInfo = () => (OriginalComponent) => (props) => {
  const coinState = useSelector((state) => state.Coin);
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const theme = useContext(ThemeContext); // 테마 정보

  const splitedName = selectedMarket.split("-");
  const coinSymbol = splitedName[1];

  return (
    <OriginalComponent
      {...props}
      theme={theme}
      coinSymbol={coinSymbol}
      orderPrice={coinState.orderPrice}
      orderAmount={coinState.orderAmount}
      orderTotalPrice={coinState.orderTotalPrice}
      selectedAskBidOrder={coinState.selectedAskBidOrder}
    />
  );
};

export default withOrderInfo;
