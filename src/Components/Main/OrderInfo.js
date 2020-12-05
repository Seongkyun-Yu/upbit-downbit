import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import OrderInfoAskBid from "./OrderInfoAskBid";

import withSelectedOption from "../../Container/withSelectedOption";
import withThemeData from "../../Container/withThemeData";
import withSelectedCoinName from "../../Container/withSelectedCoinName";

import { changeAskBidOrder } from "../../Reducer/coinReducer";
import isEqual from "react-fast-compare";

const St = {
  Container: styled.section`
    width: 100%;
    height: 50%;
    background-color: white;
  `,
  HiddenH3: styled.h3`
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0, 0);
    clip-path: polygon(0, 0);
    overflow: hidden;
    text-indent: -9999px;
  `,
  OrderTypeContainer: styled.ul`
    display: flex;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray2};

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.8rem;
    }
  `,
  OrderTypeLi: styled.li`
    width: 33.3333%;
    height: 100%;
  `,
  OrderTypeBtn: styled.button`
    width: 100%;
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
      <St.HiddenH3>주문 정보</St.HiddenH3>
      <St.OrderTypeContainer>
        <St.OrderTypeLi>
          <St.OrderTypeBtn
            borderBottom={selectedAskBidOrder === "bid" && theme.strongRed}
            fontColor={selectedAskBidOrder === "bid" && theme.strongRed}
            onClick={() => dispatch(changeAskBidOrder("bid"))}
          >
            매수
          </St.OrderTypeBtn>
        </St.OrderTypeLi>
        <St.OrderTypeLi>
          <St.OrderTypeBtn
            borderBottom={selectedAskBidOrder === "ask" && theme.strongBlue}
            fontColor={selectedAskBidOrder === "ask" && theme.strongBlue}
            onClick={() => dispatch(changeAskBidOrder("ask"))}
          >
            매도
          </St.OrderTypeBtn>
        </St.OrderTypeLi>
        <St.OrderTypeLi>
          <St.OrderTypeBtn
            borderBottom={selectedAskBidOrder === "tradeList" && "black"}
            fontColor={selectedAskBidOrder === "tradeList" && "black"}
            onClick={() => dispatch(changeAskBidOrder("tradeList"))}
          >
            거래내역
          </St.OrderTypeBtn>
        </St.OrderTypeLi>
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
