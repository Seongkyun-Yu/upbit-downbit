import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "styled-components";

const withTradeListData = () => (OriginalComponent) => (props) => {
  const theme = useContext(ThemeContext);
  const state = useSelector((state) => state);
  const tradeListData = state.Coin.tradeList.data;

  return (
    <OriginalComponent {...props} theme={theme} tradeListData={tradeListData} />
  );
};

export default withTradeListData;
