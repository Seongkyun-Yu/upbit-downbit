import React from "react";
import styled from "styled-components";

const St = {
  HeaderContainer: styled.header`
    width: 100%;
    height: 60px;
    background-color: rgb(9, 54, 135);
  `,

  SiteHeading: styled.h1`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1360px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;

    @media ${({ theme }) => theme.tablet} {
      max-width: 950px;
    }
  `,

  MainLink: styled.a`
    display: blcok;
    background-image: url("https://cdn.upbit.com/images/logo_upbit_sub.feef3c3.svg");
    background-repeat: no-repeat;
    background-position: center;
    color: transparent;
    height: 100%;
    width: 80px;
  `,
};

const Header = () => {
  return (
    <St.HeaderContainer>
      <St.SiteHeading>
        <St.MainLink href="/">업비트</St.MainLink>
      </St.SiteHeading>
    </St.HeaderContainer>
  );
};

export default Header;
