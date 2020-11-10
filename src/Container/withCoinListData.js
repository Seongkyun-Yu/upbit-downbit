import React from "react";
import { useSelector } from "react-redux";

const withCoinListData = () => (OriginalComponent) => (props) => {
  const state = useSelector((state) => state);
  const coinListDatas = state.Coin.candle.data; // 코인들 데이터

  // return Object.keys(coinListDatas).length > 1 ? (
  //   <OriginalComponent {...props} coinListDatas={coinListDatas} />
  // ) : (
  //   <div>loading</div>
  // );
  return <OriginalComponent {...props} coinListDatas={coinListDatas} />;
};

export default withCoinListData;
