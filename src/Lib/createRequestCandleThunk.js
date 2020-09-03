const createRequestCandleThunk = (type, api) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_FAILURE`;

  return (param) => async (dispatch) => {
    dispatch({ type }); // 로딩 처리

    try {
      const res = await api(param);
      dispatch({
        type: SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
      });
      throw e;
    }
  };
};
