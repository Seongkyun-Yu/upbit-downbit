import React, { useEffect } from "react";
import { getMakretNames } from "./Reducer/candleReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMakretNames());
  }, [dispatch]);
  return <div className="App">안녕~</div>;
}

export default App;
