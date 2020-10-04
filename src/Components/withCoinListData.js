import React from "react";
import { useSelector } from "react-redux";

const withCoinListData = () => (OriginalComponent) => (props) => {
  const marketNames = useSelector((state) => state.Coin.marketNames.data);
  let marketNamesArr = Object.keys(marketNames);
  const coinListDatas = useSelector((state) => state.Coin.candle.data);

  if (Object.keys(coinListDatas).length > 1)
    marketNamesArr = marketNamesArr.sort((coin1, coin2) => {
      return (
        +coinListDatas[coin2].accTradePrice -
        +coinListDatas[coin1].accTradePrice
      );
    });

  return marketNamesArr ? (
    <OriginalComponent
      {...props}
      marketNames={marketNames}
      marketNamesArr={marketNamesArr}
      coinListDatas={coinListDatas}
    />
  ) : (
    <div>loading</div>
  );
};

export default withCoinListData;
