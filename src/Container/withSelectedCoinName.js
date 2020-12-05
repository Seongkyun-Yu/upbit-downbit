import React from "react";
import { useSelector } from "react-redux";

const withSelectedCoinName = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const coinNameKor = useSelector(
    (state) => state.Coin.marketNames.data[selectedMarket].korean
  );
  const coinNameEng = useSelector(
    (state) => state.Coin.marketNames.data[selectedMarket].english
  );

  const splitedName = selectedMarket.split("-");
  const coinSymbol = splitedName[1];
  const coinNameAndMarketEng = splitedName[1] + "/" + splitedName[0];

  return (
    <OriginalComponent
      {...props}
      coinNameKor={coinNameKor}
      coinNameEng={coinNameEng}
      coinSymbol={coinSymbol}
      coinNameAndMarketEng={coinNameAndMarketEng}
    />
  );
};

export default withSelectedCoinName;
