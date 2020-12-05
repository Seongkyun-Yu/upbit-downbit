import React from "react";
import { useSelector } from "react-redux";

const withSelectedOption = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const selectedTimeType = useSelector((state) => state.Coin.selectedTimeType);
  const selectedTimeCount = useSelector(
    (state) => state.Coin.selectedTimeCount
  );
  const selectedAskBidOrder = useSelector(
    (state) => state.Coin.selectedAskBidOrder
  );
  const searchCoin = useSelector((state) => state.Coin.searchCoin);
  const orderPrice = useSelector((state) => state.Coin.orderPrice);
  const orderAmount = useSelector((state) => state.Coin.orderAmount);
  const orderTotalPrice = useSelector((state) => state.Coin.orderTotalPrice);

  return (
    <OriginalComponent
      {...props}
      selectedMarket={selectedMarket}
      selectedTimeType={selectedTimeType}
      selectedTimeCount={selectedTimeCount}
      selectedAskBidOrder={selectedAskBidOrder}
      searchCoinInput={searchCoin}
      orderPrice={orderPrice}
      orderAmount={orderAmount}
      orderTotalPrice={orderTotalPrice}
    />
  );
};

export default withSelectedOption;
