import React from "react";
import { useSelector } from "react-redux";

const withCoinInfoData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;
  const splitedName = selectedMarket.split("-");

  const coinNameKor = state.Coin.marketNames.data[selectedMarket];
  const coinNameEn = splitedName[1];
  const coinNameAndMarketEng = splitedName[1] + "/" + splitedName[0];

  const highest52WeekPrice =
    state.Coin.candle.data[selectedMarket].highest52WeekPrice;
  const lowest52WeekPrice =
    state.Coin.candle.data[selectedMarket].lowest52WeekPrice;

  const changeRateDay = state.Coin.candle.data[selectedMarket].changeRate;
  const changePriceDay = state.Coin.candle.data[selectedMarket].changePrice;

  const changeTradePriceDay =
    state.Coin.candle.data[selectedMarket].accTradePrice;
  const volumeDay = state.Coin.candle.data[selectedMarket].accTradeVolume;

  return (
    <OriginalComponent
      {...props}
      coinNameKor={coinNameKor}
      coinNameEn={coinNameEn}
      coinNameAndMarketEng={coinNameAndMarketEng}
      highest52WeekPrice={highest52WeekPrice}
      lowest52WeekPrice={lowest52WeekPrice}
      changeRateDay={changeRateDay}
      changePriceDay={changePriceDay}
      changeTradePriceDay={changeTradePriceDay}
      volumeDay={volumeDay}
    />
  );
};

export default withCoinInfoData;
