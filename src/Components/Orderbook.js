import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import withOrderbookData from "../Container/withOrderbookData";
import OrderbookItem from "./OrderbookItem";

const Container = styled.div`
  width: 45%;
  max-height: 742px;
  box-sizing: border-box;
  margin-top: 10px;
  background-color: white;
  overflow-y: scroll;
  scrollbar-color: ${(props) => props.scrollColor};
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
  /* ::-webkit-scrollbar-track {
    background: transparent;
  } */
`;

const OrderContainer = styled.div`
  display: flex;
  width: 100%;
`;

const OrderUl = styled.ul`
  /* width: 67.12%; */
  width: 100%;
`;

const Orderbook = ({
  theme,
  totalData,
  askOrderbookData,
  bidOrderbookData,
  maxOrderSize,
  beforeDayPrice,
}) => {
  return (
    <Container scrollColor={theme.middleGray}>
      <OrderContainer>
        <OrderUl>
          {askOrderbookData.map((orderbook, i) => {
            return (
              <OrderbookItem
                theme={theme}
                price={orderbook.askPrice}
                size={orderbook.askSize}
                maxOrderSize={maxOrderSize}
                key={`askOrder-${orderbook.askPrice}`}
                amountAlign={"right"}
                changeRate={(
                  ((orderbook.askPrice - beforeDayPrice) / beforeDayPrice) *
                  100
                ).toFixed(2)}
                index={i}
              />
            );
          })}
          {bidOrderbookData.map((orderbook) => {
            return (
              <OrderbookItem
                theme={theme}
                price={orderbook.bidPrice}
                size={orderbook.bidSize}
                maxOrderSize={maxOrderSize}
                key={`askOrder-${orderbook.bidPrice}`}
                amountAlign={"left"}
                changeRate={(
                  ((orderbook.bidPrice - beforeDayPrice) / beforeDayPrice) *
                  100
                ).toFixed(2)}
              />
            );
          })}
        </OrderUl>
      </OrderContainer>
    </Container>
  );
};

const OrderbookMemo = React.memo(Orderbook);

export default withOrderbookData()(OrderbookMemo);
