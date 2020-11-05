import React from "react";
import { useSelector } from "react-redux";

const withSelectedCoinPrice = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const selectedMarket = state.Coin.selectedMarket;
  const selectedCoinData = state.Coin.candle.data[selectedMarket];
  const selecteCoinCadnles = selectedCoinData.candles;
  const lastCandleIndex = selecteCoinCadnles.length - 1;

  // 52주 고가 저가
  const highestPrice52Week = selectedCoinData.highestPrice52Week;
  const highestDate52Week = selectedCoinData.highestDate52Week;
  const lowestPrice52Week = selectedCoinData.lowestPrice52Week;
  const lowestDate52Week = selectedCoinData.lowestDate52Week;

  // 24시간 거래대금, 거래량
  const tradePrice24Hour = Math.floor(selectedCoinData.tradePrice24Hour);
  const volume24Hour = Math.floor(selectedCoinData.volume24Hour);

  // 24시간 가격 변화율, 변화량
  const changeRate24Hour =
    Math.round(selectedCoinData.changeRate24Hour * 10000) / 100;
  const changePrice24Hour = selectedCoinData.changePrice24Hour
    ? selectedCoinData.changePrice24Hour
    : 0;

  // 전일, 당일 가격
  const beforeDayPrice = selecteCoinCadnles.length
    ? selecteCoinCadnles[lastCandleIndex].close -
      selectedCoinData.changePrice24Hour
    : 0;
  const price = selecteCoinCadnles.length
    ? selecteCoinCadnles[selecteCoinCadnles.length - 1].close
    : 0;

  return (
    <OriginalComponent
      {...props}
      highestPrice52Week={highestPrice52Week}
      highestDate52Week={highestDate52Week}
      lowestPrice52Week={lowestPrice52Week}
      lowestDate52Week={lowestDate52Week}
      tradePrice24Hour={tradePrice24Hour}
      volume24Hour={volume24Hour}
      changeRate24Hour={changeRate24Hour}
      changePrice24Hour={changePrice24Hour}
      beforeDayPrice={beforeDayPrice}
      price={price}
    />
  );
};

export default withSelectedCoinPrice;
