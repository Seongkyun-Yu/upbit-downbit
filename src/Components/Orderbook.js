import React from "react";
import styled from "styled-components";
import withOrderbookData from "./withOrderbookData";

const AskContainer = styled.div`
  width: 48%;
`;

const AskUl = styled.ul`
  width: 100%;
  background-color: yellow;
`;
const AskLi = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  max-width: 330px;
  background-color: tomato;
`;

const AskAmount = styled.div`
  width: 33%;
  background-color: blue;
`;

const AskPrice = styled.div`
  width: 33%;
`;

const Orderbook = ({ askOrderbookData, bidOrderbookData }) => {
  return (
    <AskContainer>
      <AskUl>
        {askOrderbookData.map((orderbook) => {
          return (
            <AskLi>
              <AskAmount>{orderbook.askSize}</AskAmount>
              <AskPrice>{orderbook.askPrice}</AskPrice>
            </AskLi>
          );
        })}
      </AskUl>
    </AskContainer>
  );
};

const OrderbookMemo = React.memo(Orderbook);

export default withOrderbookData()(OrderbookMemo);
