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
  /* background-color: blue; */
  border-top: 1px solid gray;
  border-left: 1px solid gray;
`;

const OrderPrice = styled.div`
  width: 33.33%;
  min-width: 162px;
  /* background-color: tomato; */
  border: 1px solid gray;
  text-align: right;
`;

const OrderbookItem = ({ price, size, amountAlign }) => {
  return amountAlign === "right" ? (
    <OrderLi>
      <OrderAmount amountAlign={amountAlign}>{size}</OrderAmount>
      <OrderPrice>{price}</OrderPrice>
    </OrderLi>
  ) : (
    <OrderLi>
      <OrderPrice>{price}</OrderPrice>
      <OrderAmount>{size}</OrderAmount>
    </OrderLi>
  );
};

export default React.memo(OrderbookItem);
