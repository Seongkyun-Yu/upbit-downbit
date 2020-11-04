import React from "react";
import styled from "styled-components";
import withOrderInfoData from "../Container/withOrderInfoData";

const Container = styled.div`
  width: 100%;
  height: 50%;
  /* margin-top: 10px; */
  background-color: white;
  box-sizing: border-box;
`;

const OrderTypeContainer = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.borderBottom};

  @media ${(props) => props.theme.mobileS} {
    font-size: 0.8rem;
  }
`;

const OrderType = styled.button`
  width: 33.33%;
  height: 100%;
  background-color: white;
  border: none;
  border-bottom: 3px solid ${(props) => props.borderBottom || "tranceparent"};
  outline: 0;
  font-weight: 800;
  color: ${(props) => props.fontColor || "black"};
`;

const OrderInfoContainer = styled.div`
  width: 100%;
  padding: 15px;
  padding-top: 0;
  box-sizing: border-box;
`;

const OrderInfoDetailContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  margin-top: 15px;

  @media ${(props) => props.theme.mobileS} {
    font-size: 0.6rem;
    margint-right: 10px;
  }
`;

const OrderInfoDetailTitle = styled.span`
  display: block;
  width: 20%;
  min-width: 52px;
  max-width: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
  /* text-align: left; */
  margin-left: 5px;
  margin-right: 5px;
`;

const OrderInfoInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const OrderInfoInput = styled.input`
  width: ${(props) => props.width || "100%"};
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 5px;
  border: 1px solid ${(props) => props.borderColor};
  text-align: right;
`;

const Button = styled.button`
  width: ${(props) => props.width || "38px"};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || "38px"};
  background-color: ${(props) => props.bgColor || "tranceparent"};
  border: none;
  border-top: 1px solid ${(props) => props.borderColor || "tranceparent"};
  border-right: 1px solid ${(props) => props.borderColor || "tranceparent"};
  border-bottom: 1px solid ${(props) => props.borderColor || "tranceparent"};
  outline: none;
  color: ${(props) => props.fontColor || "black"};
  margin-right: ${(props) => props.marginRight};
`;

const PossibleAmount = styled.span`
  display: block;
  width: 100%;
  text-align: right;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Unit = styled.span`
  margin-left: 5px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const OrderBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;

  @media ${(props) => props.theme.mobileS} {
    font-size: 0.8rem;
  }
`;

const OrderInfo = ({ theme }) => {
  return (
    <Container>
      <OrderTypeContainer theme={theme} borderBottom={theme.lightGray2}>
        <OrderType fontColor={theme.strongRed} borderBottom={theme.strongRed}>
          매수
        </OrderType>
        <OrderType>매도</OrderType>
        <OrderType>거래내역</OrderType>
      </OrderTypeContainer>
      <OrderInfoContainer>
        <OrderInfoDetailContainer theme={theme}>
          <OrderInfoDetailTitle>주문가능</OrderInfoDetailTitle>
          <PossibleAmount>
            0<Unit>KRW</Unit>
          </PossibleAmount>
        </OrderInfoDetailContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>매수가격</OrderInfoDetailTitle>
          <OrderInfoInputContainer>
            <OrderInfoInput borderColor={theme.lightGray2} />
            <Button bgColor={theme.lightGray} borderColor={theme.lightGray2}>
              +
            </Button>
            <Button bgColor={theme.lightGray} borderColor={theme.lightGray2}>
              -
            </Button>
          </OrderInfoInputContainer>
        </OrderInfoDetailContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>주문수량</OrderInfoDetailTitle>

          {/* <OrderInfoInputContainer> */}
          <OrderInfoInput borderColor={theme.lightGray2} />
          {/* </OrderInfoInputContainer> */}
        </OrderInfoDetailContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>주문총액</OrderInfoDetailTitle>
          <OrderInfoInput borderColor={theme.lightGray2} />
        </OrderInfoDetailContainer>
        <OrderBtnContainer theme={theme}>
          <Button
            width={"30%"}
            minWidth={"65px"}
            marginRight={"5px"}
            bgColor={theme.deepBlue}
            fontColor={"white"}
          >
            회원가입
          </Button>
          <Button width={"65%"} bgColor={theme.priceDown} fontColor={"white"}>
            로그인
          </Button>
        </OrderBtnContainer>
      </OrderInfoContainer>
    </Container>
  );
};

export default withOrderInfoData()(React.memo(OrderInfo));
