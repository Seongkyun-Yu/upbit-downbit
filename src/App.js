import React, { useEffect } from "react";
import {
  getMakretNames,
  getInitCanldes,
  startInit,
} from "./Reducer/candleReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getMakretNames());
    // dispatch(getInitCanldes());
    dispatch(startInit());
  }, [dispatch]);
  return <div className="App">안녕~</div>;
}

export default App;
