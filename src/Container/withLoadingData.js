import React from "react";
import { useSelector } from "react-redux";

const withLoadingData = () => (OriginalComponent) => (props) => {
  const isCandleLoading = useSelector(
    (state) => state.Loading["coin/GET_ONE_COIN_CANDLES"]
  );
  const isOrderbookLoading = useSelector(
    (state) => state.Loading["coin/GET_INIT_ORDERBOOKS"]
  );
  const isTradeListLoading = useSelector(
    (state) => state.Loading["coin/GET_ONE_COIN_TRADELISTS"]
  );
  const isInitCandleLoading = useSelector(
    (state) => state.Loading["coin/GET_INIT_CANDLES"]
  );
  const isMarketNamesLoading = useSelector(
    (state) => state.Loading["coin/GET_MARKET_NAMES"]
  );

  return (
    <OriginalComponent
      {...props}
      isCandleLoading={isCandleLoading}
      isOrderbookLoading={isOrderbookLoading}
      isTradeListLoading={isTradeListLoading}
      isInitCandleLoading={isInitCandleLoading}
      isMarketNamesLoading={isMarketNamesLoading}
    />
  );
};

export default withLoadingData;
