import React from "react";
import { useSelector } from "react-redux";

const withTradeListData = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const selectedTradeListData = useSelector(
    (state) => state.Coin.tradeList.data[selectedMarket]
  );

  return (
    <OriginalComponent
      {...props}
      selectedTradeListData={selectedTradeListData}
    />
  );
};

export default withTradeListData;
