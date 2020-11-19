import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  changeAmountAndTotalPrice,
  changePriceAndTotalPrice,
  changeTotalPriceAndAmount,
} from "../../Reducer/coinReducer";
import OrderInfoTradeList from "./OrderInfoTradeList";

const St = {
  Container: styled.section`
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
    width: 33.33%;
    height: 100%;
    background-color: white;
    border: none;
    border-bottom: 3px solid
      ${({ borderBottom }) => borderBottom || "tranceparent"};
    outline: 0;
    font-weight: 900;
    color: ${({ fontColor }) => fontColor || "black"};
  `,
  OrderInfoContainer: styled.div`
    width: 100%;
    padding: 15px;
    padding-top: 0;

    @media ${({ theme }) => theme.mobileS} {
      padding: 5px;
    }
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
    margin: 0;
    padding: 5px;
    padding-right: 15px;
    border: 1px solid ${({ theme }) => theme.lightGray2};
    text-align: right;
    font-size: 0.95rem;
    font-weight: ${({ fontWeight }) => fontWeight};
    @media ${({ theme }) => theme.mobileS} {
      font-size: 0.6rem;
    }
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
    @media ${({ theme }) => theme.mobileS} {
      font-size: 1rem;
    }
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

const OrderInfoAskBid = ({
  theme,
  selectedAskBidOrder,
  coinSymbol,
  orderPrice,
  orderAmount,
  orderTotalPrice,
}) => {
  const dispatch = useDispatch();
  const changePrice = useCallback(
    (e) =>
      dispatch(
        changePriceAndTotalPrice(
          parseInt(e.target.value.replace(/[^0-9-.]/g, ""))
        )
      ),
    [dispatch]
  );
  const changeAmount = useCallback(
    (e) => {
      dispatch(
        changeAmountAndTotalPrice(e.target.value.replace(/[^0-9-.]/g, ""))
      );
    },
    [dispatch]
  );
  const changeTotalPrice = useCallback(
    (e) =>
      dispatch(
        changeTotalPriceAndAmount(
          parseInt(e.target.value.replace(/[^0-9-.]/g, ""))
        )
      ),
    [dispatch]
  );

  return (
    <St.OrderInfoContainer theme={theme}>
      {selectedAskBidOrder !== "tradeList" ? (
        <>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>주문가능</St.OrderInfoDetailTitle>
            <St.PossibleAmount>
              0
              <St.Unit>
                {selectedAskBidOrder === "bid" ? "KRW" : coinSymbol}
              </St.Unit>
            </St.PossibleAmount>
          </St.OrderInfoDetailContainer>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>
              {selectedAskBidOrder === "bid" ? "매수가격" : "매도가격"}
            </St.OrderInfoDetailTitle>
            <St.OrderInfoInputContainer>
              <St.OrderInfoInput
                onChange={changePrice}
                value={orderPrice ? orderPrice.toLocaleString() : ""}
                fontWeight={800}
                placeholder={0}
              />
              <St.Button
                bgColor={theme.lightGray}
                borderColor={theme.lightGray2}
                fontColor={"#666"}
                fontSize={"1.1rem"}
              >
                +
              </St.Button>
              <St.Button
                bgColor={theme.lightGray}
                borderColor={theme.lightGray2}
                fontColor={"#666"}
                fontSize={"1.1rem"}
              >
                -
              </St.Button>
            </St.OrderInfoInputContainer>
          </St.OrderInfoDetailContainer>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>주문수량</St.OrderInfoDetailTitle>
            <St.OrderInfoInput
              onChange={changeAmount}
              value={orderAmount ? orderAmount.toLocaleString() : ""}
              placeholder={0}
            />
          </St.OrderInfoDetailContainer>
          <St.OrderInfoDetailContainer>
            <St.OrderInfoDetailTitle>주문총액</St.OrderInfoDetailTitle>
            <St.OrderInfoInput
              onChange={changeTotalPrice}
              value={orderTotalPrice ? orderTotalPrice.toLocaleString() : ""}
              placeholder={0}
            />
          </St.OrderInfoDetailContainer>
        </>
      ) : (
        <OrderInfoTradeList theme={theme} />
      )}
      <St.OrderBtnContainer>
        <St.Button
          width={"30%"}
          minWidth={"70px"}
          marginRight={"5px"}
          bgColor={theme.deepBlue}
          fontSize={"0.9rem"}
          fontColor={"white"}
        >
          회원가입
        </St.Button>
        <St.Button
          width={"65%"}
          bgColor={theme.priceDown}
          fontSize={"0.9rem"}
          fontColor={"white"}
        >
          로그인
        </St.Button>
      </St.OrderBtnContainer>
    </St.OrderInfoContainer>
  );
};

export default React.memo(OrderInfoAskBid);
