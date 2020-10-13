import React from "react";
import { useSelector } from "react-redux";

const withCoinInfoData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;
  const splitedName = selectedMarket.split("-");

  const coinNameKor = state.Coin.marketNames.data[selectedMarket];
  const coinNameEn = splitedName[1];
  const coinNameAndMarketEng = splitedName[1] + "/" + splitedName[0];

  const highestPrice24Hour =
    state.Coin.candle.data[selectedMarket].highestPrice24Hour;
  const lowestPrice24Hour =
    state.Coin.candle.data[selectedMarket].lowestPrice24Hour;

  const changeRate24Hour =
    state.Coin.candle.data[selectedMarket].changeRate24Hour;
  const changePrice24Hour =
    state.Coin.candle.data[selectedMarket].changePrice24Hour;

  const changeTradePriceDay =
    state.Coin.candle.data[selectedMarket].tradePrice24Hour;
  const volumeDay = state.Coin.candle.data[selectedMarket].volume24Hour;

  return (
    <OriginalComponent
      {...props}
      coinNameKor={coinNameKor}
      coinNameEn={coinNameEn}
      coinNameAndMarketEng={coinNameAndMarketEng}
      highestPrice24Hour={highestPrice24Hour}
      lowestPrice24Hour={lowestPrice24Hour}
      changeRate24Hour={changeRate24Hour}
      changePrice24Hour={changePrice24Hour}
      changeTradePriceDay={changeTradePriceDay}
      volumeDay={volumeDay}
    />
  );
};

export default withCoinInfoData;
