import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import withSelectedOption from "../Container/withSelectedOption";
import withThemeData from "../Container/withThemeData";
import withSelectedCoinName from "../Container/withSelectedCoinName";
import { changeAskBidOrder } from "../Reducer/coinReducer";
import OrderInfoAskBid from "./OrderInfoAskBid";
import withOrderInfo from "../Container/withOrderInfo";
import isEqual from "react-fast-compare";

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
    width: 33.3333%;
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

const OrderInfo = ({
  theme,
  selectedAskBidOrder,
  coinSymbol,
  orderPrice,
  orderAmount,
  orderTotalPrice,
}) => {
  const dispatch = useDispatch();
  // const theme = useContext(ThemeContext);

  // const state = useSelector((state) => state);
  // const coinState = state.Coin;
  // const selectedMarket = state.Coin.selectedMarket;

  // const selectedAskBidOrder = state.Coin.selectedAskBidOrder;
  // const orderPrice = state.Coin.orderPrice;
  // const orderAmount = state.Coin.orderAmount;
  // const orderTotalPrice = state.Coin.orderTotalPrice;

  // const splitedName = selectedMarket.split("-");
  // const coinSymbol = splitedName[1];

  // // const isRootURL = match.path === "/";
  // console.log("오더인포리로딩");
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

// const OrderInfoMemo = React.memo(OrderInfo);

// export default React.memo(
//   withSelectedCoinName()(
//     withSelectedOption()(withThemeData()(React.memo(OrderInfo)))
//   )
// );

// export default withOrderInfo()(React.memo(OrderInfo));

// export default React.memo(OrderInfo);

// export default withOrderInfo()(React.memo(OrderInfo));

export default withSelectedCoinName()(
  withSelectedOption()(withThemeData()(React.memo(OrderInfo, isEqual)))
);
