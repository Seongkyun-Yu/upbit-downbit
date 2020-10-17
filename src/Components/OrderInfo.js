import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 45%;
  height: 50%;
`;

const OrderTypeContainer = styled.div`
  display: flex;
`;

const OrderType = styled.button`
  width: 33.33%;
`;

const OrderInfoContainer = styled.div``;

const OrderInfoDetailContainer = styled.div`
  display: flex;
  width: 100%;
`;

const OrderInfoDetailTitle = styled.span`
  display: block;
  width: 40%;
`;

const OrderInfoInputContainer = styled.div`
  width: 60%;
`;

const OrderInfoInput = styled.input`
  width: ${(props) => props.width || "100%"};
`;

const PossibleAmount = styled.span`
  display: block;
  width: 60%;
`;

const Unit = styled.span``;

const OrderInfo = ({ theme }) => {
  return (
    <Container>
      <OrderTypeContainer>
        <OrderType>매수</OrderType>
        <OrderType>매도</OrderType>
        <OrderType>거래내역</OrderType>
      </OrderTypeContainer>
      <OrderInfoContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>주문가능</OrderInfoDetailTitle>
          <PossibleAmount>
            0<Unit>KRW</Unit>
          </PossibleAmount>
        </OrderInfoDetailContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>매수가격</OrderInfoDetailTitle>

          <OrderInfoInput />
        </OrderInfoDetailContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>주문수량</OrderInfoDetailTitle>
          <OrderInfoInputContainer>
            <OrderInfoInput />
          </OrderInfoInputContainer>
        </OrderInfoDetailContainer>
        <OrderInfoDetailContainer>
          <OrderInfoDetailTitle>주문총액</OrderInfoDetailTitle>
          <OrderInfoInput />
        </OrderInfoDetailContainer>
      </OrderInfoContainer>
    </Container>
  );
};

export default React.memo(OrderInfo);
