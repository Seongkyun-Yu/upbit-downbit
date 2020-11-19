import React from "react";
import { useSelector } from "react-redux";

const withSelectedCoinPrice = () => (OriginalComponent) => (props) => {
  const selectedMarket = useSelector((state) => state.Coin.selectedMarket);
  const selectedCoinData = useSelector(
    (state) => state.Coin.candle.data[selectedMarket]
  );

  // 24시간 고가 저가
  const highestPrice24Hour = useSelector(
    (state) => state.Coin.candle.data[selectedMarket]["highestPrice24Hour"]
  );
  const lowestPrice24Hour = useSelector(
    (state) => state.Coin.candle.data[selectedMarket]["lowestPrice24Hour"]
  );

  // 52주 고가 저가
  const highestPrice52Week = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].highestPrice52Week
  );
  const highestDate52Week = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].highestDate52Week
  );
  const lowestPrice52Week = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].lowestPrice52Week
  );
  const lowestDate52Week = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].lowestDate52Week
  );

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
  const selecteCoinCadnles = useSelector(
    (state) => state.Coin.candle.data[selectedMarket].candles
  );
  const lastCandleIndex = selecteCoinCadnles.length - 1;

  const beforeDayPrice = selecteCoinCadnles.length
    ? selecteCoinCadnles[lastCandleIndex].close - changePrice24Hour
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
      highestPrice24Hour={highestPrice24Hour}
      lowestPrice24Hour={lowestPrice24Hour}
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
