import axios from "axios";

export const coinApi = {
  getMarketCodes: () =>
    axios.get("https://api.upbit.com/v1/market/all?isDetails=false"),
  getInitCanldes: (coins) =>
    axios.get(`https://api.upbit.com/v1/ticker?markets=${coins}`),
  getInitOrderbooks: (coins) =>
    axios.get(`https://api.upbit.com/v1/orderbook?markets=${coins}`),
  getOneCoinCandles: ({ coin, timeType, timeCount }) =>
    axios
      .get(
        `https://api.upbit.com/v1/candles/${timeType}/${timeCount}?market=${coin}&count=200`
      )
      .then((res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.timestamp - b.timestamp),
        };
      }),
};
