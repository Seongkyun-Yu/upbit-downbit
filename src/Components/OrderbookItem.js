import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const OrderLi = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  &:nth-last-child() {
    border-bottom: none;
  }
`;

const OrderAmount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 50%;
  border: 1px solid ${(props) => props.borderColor};
  padding-right: 10px;
  margin-top: -1px;
  margin-left: -1px;
  font-size: 0.8rem;
  /* text-align: ${(props) => props.amountAlign}; */
  text-align: right;
`;

const OrderAmountSize = styled.div`
  position: absolute;
  width: ${(props) => props.witdhSize};
  right: 0;
  height: 70%;
  background-color: ${(props) => props.bgColor};
`;

const OrderPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 1px solid ${(props) => props.borderColor};
  margin-top: -1px;
  margin-left: -1px;
  text-align: right;
  font-size: 0.8rem;
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};
`;

const OrderPrice = styled.strong``;

const OrderPrcieRatio = styled.span`
  padding-left: 13px;
`;

const OrderbookItem = ({
  theme,
  price,
  size,
  maxOrderSize,
  type,
  changeRate24Hour,
  index,
}) => {
  const scrollRef = useRef();

  useEffect(() => {
    if (index === 7) {
      const parentNode = scrollRef.current.parentNode;
      const parentAbsoluteTop = window.pageYOffset + parentNode.offsetTop;
      const absoluteTop = window.pageYOffset + scrollRef.current.offsetTop;

      const relativeTop = absoluteTop - parentAbsoluteTop;

      scrollRef.current.parentNode.scrollTop = relativeTop;
    }
  }, [index]);

  return type === "ask" ? (
    <OrderLi ref={scrollRef}>
      <OrderAmount borderColor={theme.lightGray}>
        {size}
        <OrderAmountSize
          witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
          bgColor={theme.skyBlue2}
        />
      </OrderAmount>
      <OrderPriceContainer
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
        <OrderPrice>{price}</OrderPrice>
        <OrderPrcieRatio>{`${changeRate24Hour}%`}</OrderPrcieRatio>
      </OrderPriceContainer>
    </OrderLi>
  ) : (
    <OrderLi>
      <OrderAmount amountAlign={"left"} borderColor={theme.lightGray}>
        {size}
        <OrderAmountSize
          witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
          bgColor={theme.lightPink2}
        />
      </OrderAmount>
      <OrderPriceContainer
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
        <OrderPrice>{price}</OrderPrice>
        <OrderPrcieRatio>{`${changeRate24Hour}%`}</OrderPrcieRatio>
      </OrderPriceContainer>
    </OrderLi>
  );
};

export default React.memo(OrderbookItem);
