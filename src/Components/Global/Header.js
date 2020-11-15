import React from "react";
import styled from "styled-components";
import logo from "../../styles/img/whiteLogo.png";

const St = {
  Header: styled.header`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 60px;
    background-color: rgb(9, 54, 135);
  `,

  Container: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1360px;
    margin: 0 auto;

    @media ${({ theme }) => theme.tablet} {
      max-width: 950px;
    }
  `,

  SiteHeading: styled.h1`
    padding: 0 20px;
    width: 180px;
    height: 100%;
  `,

  MainLink: styled.a`
    display: block;
    background-image: ${({ logo }) => `url(${logo})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    color: transparent;
    width: 100%;
    height: 100%;
  `,
};

const Header = () => {
  return (
    <St.Header>
      <St.Container>
        <St.SiteHeading>
          <St.MainLink href="/" logo={logo}>
            업비트
          </St.MainLink>
        </St.SiteHeading>
      </St.Container>
    </St.Header>
  );
};

export default Header;
