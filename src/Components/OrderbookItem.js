import React from "react";
import styled from "styled-components";

const OrderLi = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  /* max-width: 330px; */
  border: 1px solid gray;
  margin-top: -1px;
  margin-left: -1px;
  &:nth-last-child() {
    border-bottom: none;
  }
`;

const OrderAmount = styled.div`
  width: 40%;
  /* min-width: 100px; */
  /* background-color: blue; */
  /* border: 1px solid gray;
  margin-top: -1px;
  margin-left: -1px; */
  border-left: 1px solid gray;
  margin-left: -1px;
  font-size: 0.8rem;
  text-align: ${(props) => props.amountAlign};
`;

const OrderPrice = styled.div`
  width: 60%;
  /* min-width: 162px; */
  /* background-color: tomato; */
  border-left: 1px solid gray;
  margin-top: -1px;
  margin-left: -1px;
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
      <OrderAmount amountAlign={"left"}>{size}</OrderAmount>
    </OrderLi>
  );
};

export default React.memo(OrderbookItem);
