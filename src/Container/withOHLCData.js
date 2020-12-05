import React from "react";
import { useSelector } from "react-redux";

const withOHLCData = () => (OriginalComponent) => () => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket); // 선택된 코인/마켓
  const selectedCandles = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].candles
  ); // 선택된 코인/마켓 캔들 정보

  // return selectedCandles.length ? (
  //   <OriginalComponent data={selectedCandles} />
  // ) : (
  //   <div className="center">Chart Loading</div>
  // );
  return <OriginalComponent data={selectedCandles} />;
};

export default withOHLCData;
