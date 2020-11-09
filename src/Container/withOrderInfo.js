import React, { useCallback, useContext } from "react";
import { ThemeContext } from "styled-components";
import { useSelector } from "react-redux";

const withOrderInfo = () => (OriginalComponent) => () => {
  const state = useSelector((state) => state);
  const coinState = state.Coin;
  const selectedMarket = state.Coin.selectedMarket;
  const theme = useContext(ThemeContext); // 테마 정보

  const splitedName = selectedMarket.split("-");
  const coinSymbol = splitedName[1];

  // OriginalComponent = React.memo(OriginalComponent);

  return (
    <OriginalComponent
      // {...props}
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
