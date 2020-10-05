import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const withOHLCData = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket); // 선택된 코인/마켓
  const selectedCandles = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].candles
  ); // 선택된 코인/마켓 캔들 정보
  const selectedTimeType = useSelector((state) => state.Coin.selectedTimeType); // 선택된 시간 타입
  const theme = useContext(ThemeContext); // 테마 정보

  return !selectedCandles.length ? (
    <div className="center">Chart Loading</div>
  ) : (
    <OriginalComponent
      {...props}
      data={selectedCandles}
      selectedTimeType={selectedTimeType}
      theme={theme}
    />
  );
};

export default withOHLCData;
