import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
  * {
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  body {
    background-color: rgb(231, 234, 239);
    height: 100%;
  }
`;

export default GlobalStyle;
