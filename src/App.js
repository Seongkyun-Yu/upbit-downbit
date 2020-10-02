import React, { useEffect } from "react";
import { startInit } from "./Reducer/coinReducer";
import { useDispatch } from "react-redux";
import MainChart from "./Components/MainChart";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);
  return (
    <div className="App">
      <MainChart />
    </div>
  );
}

export default App;
