import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import OrderbookItem from "./OrderbookItem";
import Loading from "../Global/Loading";

import withThemeData from "../../Container/withThemeData";
import withSelectedCoinPrice from "../../Container/withSelectedCoinPrice";
import withOrderbookData from "../../Container/withOrderbookData";
import withSelectedOption from "../../Container/withSelectedOption";
import withLoadingData from "../../Container/withLoadingData";

import isEqual from "react-fast-compare";

const St = {
  Container: styled.section`
    width: 46%;
    max-height: 722px;
    height: 100%;
    background-color: white;
  `,
  HiddenH3: styled.h3`
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0, 0);
    clip-path: polygon(0, 0);
    overflow: hidden;
    text-indent: -9999px;
  `,
  OrderUl: styled.ul`
    width: 100%;
    height: 722px;
    overflow-y: scroll;
    scrollbar-color: ${({ theme }) => theme.middleGray};
    scrollbar-width: thin;
    scrollbar-base-color: transparent;
    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
      border-radius: 5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.middleGray};
      border-radius: 5rem;
    }
  `,
};

const Orderbook = ({
  theme,
  // totalData,
  askOrderbookData,
  bidOrderbookData,
  maxOrderSize,
  beforeDayPrice,
  selectedMarket,
  isOrderbookLoading,
}) => {
  const lastTradePrice = useSelector(
    (state) =>
      state.Coin.tradeList.data[selectedMarket] &&
      state.Coin.tradeList.data[selectedMarket][0].trade_price
  );
  return (
    <St.Container>
      <St.HiddenH3>호가창</St.HiddenH3>
      <St.OrderUl>
        {isOrderbookLoading ? (
          <Loading />
        ) : (
          askOrderbookData.map((orderbook, i) => {
            return (
              <OrderbookItem
                theme={theme}
                price={orderbook.askPrice}
                size={orderbook.askSize}
                maxOrderSize={maxOrderSize}
                // key={`askOrder-${orderbook.askPrice}`}
                key={`askOrder-${i}`}
                type={"ask"}
                changeRate24Hour={(
                  ((orderbook.askPrice - beforeDayPrice) / beforeDayPrice) *
                  100
                ).toFixed(2)}
                index={i}
                outline={lastTradePrice === orderbook.askPrice}
              />
            );
          })
        )}
        {isOrderbookLoading ||
          bidOrderbookData.map((orderbook, i) => {
            return (
              <OrderbookItem
                theme={theme}
                price={orderbook.bidPrice}
                size={orderbook.bidSize}
                maxOrderSize={maxOrderSize}
                // key={`bidOrder-${orderbook.bidPrice}`}
                key={`bidOrder-${i}`}
                type={"bid"}
                changeRate24Hour={(
                  ((orderbook.bidPrice - beforeDayPrice) / beforeDayPrice) *
                  100
                ).toFixed(2)}
                index={i}
                outline={lastTradePrice === orderbook.bidPrice}
              />
            );
          })}
      </St.OrderUl>
    </St.Container>
  );
};

export default withOrderbookData()(
  withSelectedCoinPrice()(
    withSelectedOption()(
      withLoadingData()(withThemeData()(React.memo(Orderbook, isEqual)))
    )
  )
);
