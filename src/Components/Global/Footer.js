import React from "react";
import styled from "styled-components";

const St = {
  Footer: styled.footer`
    width: 100%;
    height: 150px;
    background-color: white;
  `,
};

const Footer = () => {
  return <St.Footer></St.Footer>;
};

export default Footer;
