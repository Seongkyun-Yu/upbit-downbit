import React from "react";
import styled from "styled-components";

const TradeList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 33.3333%;
  border: 1px solid gray;
  margin-top: -1px;
  margin-left: -1px;
`;

const OrderbookTradeList = () => {
  return <TradeList></TradeList>;
};

export default OrderbookTradeList;
