import React from "react";
import styled from "styled-components";

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

const OrderbookItem = ({ price, size, amountAlign }) => {
  return amountAlign === "right" ? (
    <OrderLi key={`orderbook-ask${price}`}>
      <OrderAmount>{size}</OrderAmount>
      <OrderPrice>{price}</OrderPrice>
    </OrderLi>
  ) : (
    <OrderLi key={`orderbook-ask${price}`}>
      <OrderPrice>{price}</OrderPrice>
      <OrderAmount>{size}</OrderAmount>
    </OrderLi>
  );
};

export default OrderbookItem;
