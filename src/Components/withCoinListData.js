import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const withCoinListData = () => (OriginalComponent) => (props) => {
  const marketNames = useSelector((state) => state.Coin.marketNames.data);
  let marketNamesArr = Object.keys(marketNames);
  const coinListDatas = useSelector((state) => state.Coin.candle.data);
  const theme = useContext(ThemeContext);

  // 데이터 받는 데 성공하면 정렬한다
  if (Object.keys(coinListDatas).length > 1)
    marketNamesArr = marketNamesArr.sort((coin1, coin2) => {
      return (
        +coinListDatas[coin2].accTradePrice -
        +coinListDatas[coin1].accTradePrice
      );
    });

  return Object.keys(coinListDatas).length > 1 ? (
    <OriginalComponent
      {...props}
      marketNames={marketNames}
      marketNamesArr={marketNamesArr}
      coinListDatas={coinListDatas}
      theme={theme}
    />
  ) : (
    <div>loading</div>
  );
};

export default withCoinListData;
