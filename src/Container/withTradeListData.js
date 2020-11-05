import React from "react";
import { useSelector } from "react-redux";

const withTradeListData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const tradeListData = state.Coin.tradeList.data;
  const selectedMarket = state.Coin.selectedMarket;
  const selectedTradeListData = tradeListData[selectedMarket];

  return (
    <OriginalComponent
      {...props}
      selectedTradeListData={selectedTradeListData}
    />
  );
};

export default withTradeListData;
