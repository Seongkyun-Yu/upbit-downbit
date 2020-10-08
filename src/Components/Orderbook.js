import React from "react";
import styled from "styled-components";
import withOrderbookData from "./withOrderbookData";

const Container = styled.div`
  width: 48%;
`;

const OrderUl = styled.ul`
  width: 100%;
  background-color: yellow;
`;
const OrderLi = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  /* max-width: 330px; */
`;

const OrderAmount = styled.div`
  width: 33.33%;
  min-width: 100px;
  background-color: blue;
`;

const OrderPrice = styled.div`
  width: 33.33%;
  min-width: 162px;
  background-color: tomato;
`;

const Orderbook = ({ askOrderbookData, bidOrderbookData }) => {
  return (
    <Container>
      <OrderUl>
        {askOrderbookData.map((orderbook) => {
          return (
            <OrderLi key={`orderbook-ask${orderbook.askPrice}`}>
              <OrderAmount>{orderbook.askSize}</OrderAmount>
              <OrderPrice>{orderbook.askPrice}</OrderPrice>
            </OrderLi>
          );
        })}
      </OrderUl>
    </Container>
  );
};

const OrderbookMemo = React.memo(Orderbook);

export default withOrderbookData()(OrderbookMemo);
