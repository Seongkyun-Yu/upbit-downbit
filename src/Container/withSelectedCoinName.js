import React from "react";
import { useSelector } from "react-redux";

const withSelectedCoinName = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;

  const splitedName = selectedMarket.split("-");
  const coinNameKor = state.Coin.marketNames.data[selectedMarket].korean;
  const coinNameEng = state.Coin.marketNames.data[selectedMarket].english;
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
