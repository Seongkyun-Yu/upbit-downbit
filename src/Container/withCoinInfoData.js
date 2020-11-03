import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";
import { numWithComma } from "../Lib/utils";

const withCoinInfoData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const theme = useContext(ThemeContext); // 테마 정보

  const selectedMarket = state.Coin.selectedMarket;
  const splitedName = selectedMarket.split("-");
  const candles = state.Coin.candle.data[selectedMarket].candles;

  const coinNameKor = state.Coin.marketNames.data[selectedMarket].korean;
  const coinNameEn = splitedName[1];
  const coinNameAndMarketEng = splitedName[1] + "/" + splitedName[0];

  const highestPrice24Hour = numWithComma(
    state.Coin.candle.data[selectedMarket].highestPrice24Hour
  );
  const lowestPrice24Hour = numWithComma(
    state.Coin.candle.data[selectedMarket].lowestPrice24Hour
  );

  const changeRate24Hour =
    Math.round(
      state.Coin.candle.data[selectedMarket].changeRate24Hour * 10000
    ) / 100;
  const changePrice24Hour = state.Coin.candle.data[selectedMarket]
    .changePrice24Hour
    ? numWithComma(state.Coin.candle.data[selectedMarket].changePrice24Hour)
    : 0;

  const changeTradePriceDay = numWithComma(
    Math.floor(state.Coin.candle.data[selectedMarket].tradePrice24Hour)
  );
  const volumeDay = numWithComma(
    Math.floor(state.Coin.candle.data[selectedMarket].volume24Hour * 10000) /
      100
  );

  const price = candles.length
    ? numWithComma(candles[candles.length - 1].close)
    : 0;

  const priceColor = changeRate24Hour > 0 ? theme.priceUp : theme.priceDown;

  return (
    <OriginalComponent
      {...props}
      theme={theme}
      coinNameKor={coinNameKor}
      coinNameEn={coinNameEn}
      coinNameAndMarketEng={coinNameAndMarketEng}
      highestPrice24Hour={highestPrice24Hour}
      lowestPrice24Hour={lowestPrice24Hour}
      changeRate24Hour={changeRate24Hour}
      changePrice24Hour={changePrice24Hour}
      changeTradePriceDay={changeTradePriceDay}
      volumeDay={volumeDay}
      price={price}
      priceColor={priceColor}
    />
  );
};

export default withCoinInfoData;
