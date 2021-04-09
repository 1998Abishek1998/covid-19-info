import React from "react";
import "./css/App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllInfo from "./pages/AllInfo";
import Error from "./pages/Error";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/AllInfo" component={AllInfo} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
