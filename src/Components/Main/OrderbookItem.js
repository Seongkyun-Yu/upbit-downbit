import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { changePriceAndTotalPrice } from "../../Reducer/coinReducer";
import styled, { css } from "styled-components";

import isEqual from "react-fast-compare";

const St = {
  OrderLi: styled.li`
    display: flex;
    width: 100%;
    height: 45px;
    &:nth-last-child() {
      border-bottom: none;
    }
    font-size: 0.8rem;
    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.7rem;
    }
  `,

  Btn: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  `,

  OrderAmount: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 50%;
    height: 45px;
    border: 1px solid ${({ borderColor }) => borderColor};
    padding-left: 5px;
    padding-right: 10px;
    margin-top: -1px;
    margin-left: -1px;
    text-align: right;
  `,

  OrderAmountSize: styled.div`
    position: absolute;
    width: ${({ witdhSize }) => witdhSize};
    left: 0;
    height: 70%;
    background-color: ${({ bgColor }) => bgColor};
  `,

  OrderPriceContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 50%;
    height: 45px;
    border: 1px solid ${({ borderColor }) => borderColor};
    margin-top: -1px;
    margin-left: -1px;
    text-align: right;
    color: ${({ fontColor }) => fontColor};
    background-color: ${({ bgColor }) => bgColor};

    ${({ outline }) =>
      outline &&
      css`
        border: 2px solid black;
        border-right: 3px solid black;
        &::after {
          content: "";
          display: block;
          position: absolute;
          left: -5px;
          width: 0px;
          height: 0px;
          border-right: 10px solid transparent;
          border-bottom: 10px solid black;
          transform: rotate(225deg);
          -ms-transform: rotate(225deg);
          -webkit-transform: rotate(225deg);
          -moz-transform: rotate(225deg);
          -o-transform: rotate(225deg);
        }
      `}

    @media ${({ theme }) => theme.mobileM} {
      flex-direction: column;
    }
  `,

  OrderPrice: styled.strong`
    font-weight: 800;
  `,

  OrderPrcieRatio: styled.span`
    padding-left: 13px;
  `,
};

const OrderbookItem = ({
  theme,
  price,
  size,
  maxOrderSize,
  type,
  changeRate24Hour,
  index,
  outline,
}) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    if (index === 7 && type === "ask") {
      const parentNode = scrollRef.current.parentNode;
      const parentAbsoluteTop = window.pageYOffset + parentNode.offsetTop;
      const absoluteTop = window.pageYOffset + scrollRef.current.offsetTop;
      const relativeTop = absoluteTop - parentAbsoluteTop;
      scrollRef.current.parentNode.scrollTop = relativeTop;
    }
  }, []);

  return (
    <St.OrderLi ref={scrollRef} theme={theme}>
      <St.Btn
        onClick={(_) => {
          document.activeElement.blur();
          dispatch(changePriceAndTotalPrice(price));
        }}
      >
        <St.OrderPriceContainer
          theme={theme}
          fontColor={
            changeRate24Hour > 0
              ? theme.priceUp
              : +changeRate24Hour < 0
              ? theme.priceDown
              : "black"
          }
          borderColor={theme.lightGray}
          bgColor={type === "ask" ? theme.skyBlue1 : theme.lightPink1}
          // outline={lastTradePrice === price}
          outline={outline}
        >
          <St.OrderPrice>{price.toLocaleString()}</St.OrderPrice>
          <St.OrderPrcieRatio>{`${changeRate24Hour}%`}</St.OrderPrcieRatio>
        </St.OrderPriceContainer>
        <St.OrderAmount amountAlign={"left"} borderColor={theme.lightGray}>
          {size}
          <St.OrderAmountSize
            witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
            bgColor={type === "ask" ? theme.skyBlue2 : theme.lightPink2}
          />
        </St.OrderAmount>
      </St.Btn>
    </St.OrderLi>
  );
};

export default React.memo(OrderbookItem, isEqual);
