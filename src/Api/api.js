import axios from "axios";

export const coinApi = {
  getMarketCodes: () =>
    axios.get("https://api.upbit.com/v1/market/all?isDetails=false"),
  getInitCanldes: (coins) =>
    axios.get(`https://api.upbit.com/v1/ticker?markets=${coins}`),
  candleWss: "wss://api.upbit.com/websocket/v1",
};
