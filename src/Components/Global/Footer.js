import React from "react";
import styled from "styled-components";

const St = {
  Footer: styled.footer`
    display: block;
    width: 100%;
    height: 150px;
    background-color: white;
    @media ${({ theme }) => theme.mobileM} {
      display: none;
    }
  `,
  Container: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1360px;
    margin: 0 auto;

    @media ${({ theme }) => theme.tablet} {
      display: block;
      max-width: 950px;
    }
  `,
};

const Footer = ({ theme }) => {
  return <St.Footer theme={theme}></St.Footer>;
};

export default Footer;
