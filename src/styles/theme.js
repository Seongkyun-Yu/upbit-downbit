const size = {
  mobile: "0px",
  tablet: "770px",
  desktop: "1024px",
};

const theme = {
  deepBlue: "#093687",
  priceUp: "rgb(210, 79, 69)",
  priceDown: "rgb(18, 97, 196)",
  priceUpTrans: "rgba(210, 79, 69, 0.5)",
  priceDownTrans: "rgba(18, 97, 196, 0.5)",
  middleGray: "#00000033",
  lightGray: "rgb(244, 245, 248)",
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default theme;
