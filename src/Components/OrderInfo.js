import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import withSelectedOption from "../Container/withSelectedOption";
import withThemeData from "../Container/withThemeData";
import withSelectedCoinName from "../Container/withSelectedCoinName";
import { changeAskBidOrder } from "../Reducer/coinReducer";
import OrderInfoAskBid from "./OrderInfoAskBid";
import isEqual from "react-fast-compare";

const St = {
  Container: styled.div`
    width: 100%;
    height: 50%;
    background-color: white;
  `,

  OrderTypeContainer: styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.8rem;
    }
  `,

  OrderType: styled.button`
    width: 33.3333%;
    height: 100%;
    background-color: white;
    border: none;
    border-bottom: 3px solid ${({ borderBottom }) => borderBottom || "white"};
    outline: 0;
    font-weight: 900;
    color: ${({ fontColor }) => fontColor || "black"};
    cursor: pointer;
  `,
};

const OrderInfo = ({
  theme,
  selectedAskBidOrder,
  coinSymbol,
  orderPrice,
  orderAmount,
  orderTotalPrice,
}) => {
  const dispatch = useDispatch();
  return (
    <St.Container>
      <St.OrderTypeContainer>
        <St.OrderType
          borderBottom={selectedAskBidOrder === "bid" && theme.strongRed}
          fontColor={selectedAskBidOrder === "bid" && theme.strongRed}
          onClick={() => dispatch(changeAskBidOrder("bid"))}
        >
          매수
        </St.OrderType>
        <St.OrderType
          borderBottom={selectedAskBidOrder === "ask" && theme.strongBlue}
          fontColor={selectedAskBidOrder === "ask" && theme.strongBlue}
          onClick={() => dispatch(changeAskBidOrder("ask"))}
        >
          매도
        </St.OrderType>
        <St.OrderType
          borderBottom={selectedAskBidOrder === "tradeList" && "black"}
          fontColor={selectedAskBidOrder === "tradeList" && "black"}
          onClick={() => dispatch(changeAskBidOrder("tradeList"))}
        >
          거래내역
        </St.OrderType>
      </St.OrderTypeContainer>
      <OrderInfoAskBid
        theme={theme}
        selectedAskBidOrder={selectedAskBidOrder}
        coinSymbol={coinSymbol}
        orderPrice={orderPrice}
        orderAmount={orderAmount}
        orderTotalPrice={orderTotalPrice}
      />
    </St.Container>
  );
};

export default withSelectedCoinName()(
  withSelectedOption()(withThemeData()(React.memo(OrderInfo, isEqual)))
);
