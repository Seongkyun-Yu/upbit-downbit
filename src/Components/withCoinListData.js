import React from "react";
import { useSelector } from "react-redux";

const withCoinListData = () => (OriginalComponent) => (props) => {
  const marketNames = useSelector((state) => state.Coin.marketNames);
  const marketNamesArr = Object.keys(marketNames);
  const coinListDatas = useSelector((state) => state.Coin.candle.data);

  return (
    <OriginalComponent
      {...props}
      marketNames={marketNames}
      marketNamesArr={marketNamesArr}
      coinListDatas={coinListDatas}
    />
  );
};

export default withCoinListData;
