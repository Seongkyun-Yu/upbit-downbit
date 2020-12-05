import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

const withThemeData = () => (OriginalComponent) => (props) => {
  const theme = useContext(ThemeContext); // 테마 정보
  return <OriginalComponent {...props} theme={theme} />;
};

export default withThemeData;
