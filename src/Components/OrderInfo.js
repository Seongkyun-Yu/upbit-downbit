import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import withSelectedOption from "../Container/withSelectedOption";
import withTheme from "../Container/withTheme";
import { changeAskBidOrder } from "../Reducer/coinReducer";
import OrderInfoAskBid from "./OrderInfoAskBid";

const St = {
  Container: styled.div`
    width: 100%;
    height: 50%;
    background-color: white;
    box-sizing: border-box;
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
    width: 33.33%;
    height: 100%;
    background-color: white;
    border: none;
    border-bottom: 3px solid ${({ borderBottom }) => borderBottom || "white"};
    outline: 0;
    font-weight: 900;
    color: ${({ fontColor }) => fontColor || "black"};
  `,

  OrderInfoContainer: styled.div`
    width: 100%;
    padding: 15px;
    padding-top: 0;
    box-sizing: border-box;
  `,

  OrderInfoDetailContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 38px;
    margin-top: 15px;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.6rem;
      margint-right: 10px;
    }
  `,

  OrderInfoDetailTitle: styled.span`
    display: block;
    width: 20%;
    min-width: 52px;
    max-width: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
    margin-left: 5px;
    margin-right: 5px;
  `,

  OrderInfoInputContainer: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `,

  OrderInfoInput: styled.input`
    width: ${({ width }) => width || "100%"};
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 5px;
    border: 1px solid ${({ theme }) => theme.lightGray2};
    text-align: right;
  `,
  Button: styled.button`
    width: ${({ width }) => width || "50px"};
    min-width: ${({ minWidth }) => minWidth};
    height: ${({ height }) => height || "38px"};
    margin-right: ${({ marginRight }) => marginRight};
    background-color: ${({ bgColor }) => bgColor || "tranceparent"};
    border: none;
    border-top: 1px solid ${({ borderColor }) => borderColor || "tranceparent"};
    border-right: 1px solid
      ${({ borderColor }) => borderColor || "tranceparent"};
    border-bottom: 1px solid
      ${({ borderColor }) => borderColor || "tranceparent"};
    outline: none;
    color: ${({ fontColor }) => fontColor || "black"};
    font-size: ${({ fontSize }) => fontSize};
    font-weight: 900;
  `,

  PossibleAmount: styled.span`
    display: block;
    width: 100%;
    text-align: right;
    font-size: 1.2rem;
    font-weight: 600;
  `,

  Unit: styled.span`
    margin-left: 5px;
    font-size: 0.8rem;
    font-weight: 500;
  `,

  OrderBtnContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 50px;

    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.8rem;
    }
  `,
};

const OrderInfo = ({ theme, selectedAskBidOrder }) => {
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
      />
    </St.Container>
  );
};

export default withSelectedOption()(withTheme()(React.memo(OrderInfo)));
