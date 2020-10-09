import React from "react";
import styled from "styled-components";
import withOrderbookData from "./withOrderbookData";
import OrderbookItem from "./OrderbookItem";

const Container = styled.div`
  width: 48%;
`;

const OrderUl = styled.ul`
  width: 100%;
  background-color: yellow;
`;

const Orderbook = ({ askOrderbookData, bidOrderbookData }) => {
  return (
    <Container>
      <OrderUl>
        {askOrderbookData.map((orderbook) => {
          return (
            <OrderbookItem
              price={orderbook.askPrice}
              size={orderbook.askSize}
              key={`askOrder-${orderbook.askPrice}`}
              amountAlign={"right"}
            />
          );
        })}
        {bidOrderbookData.map((orderbook) => {
          return (
            <OrderbookItem
              price={orderbook.bidPrice}
              size={orderbook.bidSize}
              key={`askOrder-${orderbook.bidPrice}`}
              amountAlign={"left"}
            />
          );
        })}
      </OrderUl>
    </Container>
  );
};

const OrderbookMemo = React.memo(Orderbook);

export default withOrderbookData()(OrderbookMemo);
