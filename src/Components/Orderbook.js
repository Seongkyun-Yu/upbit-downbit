import React from "react";
import styled from "styled-components";
import withOrderbookData from "../Container/withOrderbookData";
import OrderbookItem from "./OrderbookItem";
import isEqual from "react-fast-compare";
import withThemeData from "../Container/withThemeData";
import withSelectedCoinPrice from "../Container/withSelectedCoinPrice";
import Loading from "../styles/Loading";

const St = {
  Container: styled.div`
    width: 46%;
    max-height: 722px;
    height: 100%;
    background-color: white;
  `,

  OrderUl: styled.ul`
    width: 100%;
    height: 722px;
    /* min-height: 
    max-height: 722px; */
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
}) => {
  // console.log("오더북랜더", askOrderbookData, bidOrderbookData);

  return (
    <St.Container>
      <St.OrderUl>
        {askOrderbookData.length ? (
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
              />
            );
          })
        ) : (
          <Loading />
        )}
        {bidOrderbookData.length &&
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
              />
            );
          })}
      </St.OrderUl>
    </St.Container>
  );
};

export default withOrderbookData()(
  withSelectedCoinPrice()(withThemeData()(React.memo(Orderbook)))
);
