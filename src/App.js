import React, { useEffect } from "react";
import { startInit } from "./Reducer/coinReducer";
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
