import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const withCoinListData = () => (OriginalComponent) => (props) => {
  const marketNames = useSelector((state) => state.Coin.marketNames.data); // 코인 마켓 이름들(객체)
  let marketNamesArr = Object.keys(marketNames); // 코인 마켓 이름 배열화
  const coinListDatas = useSelector((state) => state.Coin.candle.data); // 코인들 데이터
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket); // 선택된 마켓 이름
  const theme = useContext(ThemeContext); // 테마 정보

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
      selectedMarket={selectedMarket}
      theme={theme}
    />
  ) : (
    <div>loading</div>
  );
};

export default withCoinListData;
