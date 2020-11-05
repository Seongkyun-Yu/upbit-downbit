import React from "react";
import styled from "styled-components";
import withOrderbookData from "../Container/withOrderbookData";
import OrderbookItem from "./OrderbookItem";
import isEqual from "react-fast-compare";

const St = {
  Container: styled.div`
    width: 45%;
    max-height: 750px;
    height: 100%;
    box-sizing: border-box;
    background-color: white;
  `,

  OrderUl: styled.ul`
    width: 100%;
    height: 100%;
    max-height: 750px;
    scrollbar-color: ${({ theme }) => theme.middleGray};
    scrollbar-width: thin;
    scrollbar-base-color: transparent;
    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
      border-radius: 5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.scrollColor};
      border-radius: 5rem;
    }
  `,
};

const Orderbook = ({
  theme,
  totalData,
  askOrderbookData,
  bidOrderbookData,
  maxOrderSize,
  beforeDayPrice,
}) => {
  return (
    <St.Container>
      <St.OrderUl>
        {askOrderbookData.map((orderbook, i) => {
          return (
            <OrderbookItem
              theme={theme}
              price={orderbook.askPrice}
              size={orderbook.askSize}
              maxOrderSize={maxOrderSize}
              key={`askOrder-${orderbook.askPrice}`}
              type={"ask"}
              changeRate24Hour={(
                ((orderbook.askPrice - beforeDayPrice) / beforeDayPrice) *
                100
              ).toFixed(2)}
              index={i}
            />
          );
        })}
        {bidOrderbookData.map((orderbook, i) => {
          return (
            <OrderbookItem
              theme={theme}
              price={orderbook.bidPrice}
              size={orderbook.bidSize}
              maxOrderSize={maxOrderSize}
              key={`askOrder-${orderbook.bidPrice}`}
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

// const OrderbookMemo = React.memo(Orderbook, isEqual);

export default withOrderbookData()(React.memo(Orderbook, isEqual));
