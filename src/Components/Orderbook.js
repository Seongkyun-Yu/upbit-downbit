import React from "react";
import styled from "styled-components";
import withOrderbookData from "./withOrderbookData";
import OrderbookItem from "./OrderbookItem";
import OrderbookCoinInfo from "./OrderbookCoinInfo";

const Container = styled.div`
  width: 40%;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const OrderUl = styled.ul`
  width: 66.66%;
  /* background-color: yellow; */
`;

const Orderbook = ({
  totalData,
  askOrderbookData,
  bidOrderbookData,
  volume24,
  tradePrice24,
  highest52WeekPrice,
  highest52WeekDate,
  lowest52WeekPrice,
  lowest52WeekDate,
}) => {
  return (
    <Container>
      <OrderContainer>
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
        </OrderUl>
        <OrderbookCoinInfo
          volume24={volume24}
          tradePrice24={tradePrice24}
          highest52WeekPrice={highest52WeekPrice}
          highest52WeekDate={highest52WeekDate}
          lowest52WeekPrice={lowest52WeekPrice}
          lowest52WeekDate={lowest52WeekDate}
        />
      </OrderContainer>
      <OrderContainer>
        <OrderUl>
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
      </OrderContainer>
    </Container>
  );
};

const OrderbookMemo = React.memo(Orderbook);

export default withOrderbookData()(OrderbookMemo);
