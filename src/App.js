import React, { useEffect } from "react";
import { startInit } from "./Reducer/coinReducer";
import { useDispatch } from "react-redux";
import Main from "./Pages/Main";
import styled from "styled-components";

const DefaultContainer = styled.div`
  background-color: rgb(231, 234, 239);
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, [dispatch]);
  return (
    <DefaultContainer>
      <Main />
    </DefaultContainer>
  );
}

export default App;
