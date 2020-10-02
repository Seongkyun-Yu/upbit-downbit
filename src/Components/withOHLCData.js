import React from "react";
import { useSelector } from "react-redux";

const withOHLCData = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const selectedCandles = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].candles
  );
  const selectedTimeType = useSelector((state) => state.Coin.selectedTimeType);

  return !selectedCandles.length ? (
    <div className="center">Chart Loading</div>
  ) : (
    <OriginalComponent
      {...props}
      data={selectedCandles}
      selectedTimeType={selectedTimeType}
    />
  );
};

export default withOHLCData;
