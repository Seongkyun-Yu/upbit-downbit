import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import isEqual from "react-fast-compare";
import { useDispatch } from "react-redux";
import { changePriceAndTotalPrice } from "../Reducer/coinReducer";

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
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
  `,

  OrderAmount: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 50%;
    height: 100%;
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
    width: 50%;
    height: 100%;
    border: 1px solid ${({ borderColor }) => borderColor};
    margin-top: -1px;
    margin-left: -1px;
    text-align: right;
    color: ${({ fontColor }) => fontColor};
    background-color: ${({ bgColor }) => bgColor};

    @media ${({ theme }) => theme.mobileM} {
      flex-direction: column;
    }
  `,

  OrderPrice: styled.strong``,

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

  return type === "ask" ? (
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
          bgColor={theme.skyBlue1}
        >
          <St.OrderPrice>{price.toLocaleString()}</St.OrderPrice>
          <St.OrderPrcieRatio>{`${changeRate24Hour}%`}</St.OrderPrcieRatio>
        </St.OrderPriceContainer>
        <St.OrderAmount borderColor={theme.lightGray}>
          {size}
          <St.OrderAmountSize
            witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
            bgColor={theme.skyBlue2}
          />
        </St.OrderAmount>
      </St.Btn>
    </St.OrderLi>
  ) : (
    <St.OrderLi>
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
          bgColor={theme.lightPink1}
        >
          <St.OrderPrice>{price.toLocaleString()}</St.OrderPrice>
          <St.OrderPrcieRatio>{`${changeRate24Hour}%`}</St.OrderPrcieRatio>
        </St.OrderPriceContainer>
        <St.OrderAmount amountAlign={"left"} borderColor={theme.lightGray}>
          {size}
          <St.OrderAmountSize
            witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
            bgColor={theme.lightPink2}
          />
        </St.OrderAmount>
      </St.Btn>
    </St.OrderLi>
  );
};

export default React.memo(OrderbookItem, isEqual);
