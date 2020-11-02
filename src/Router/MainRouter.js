import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "../Pages/Main";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/trade" component={Main} />
    </Switch>
  );
};

export default MainRouter;
