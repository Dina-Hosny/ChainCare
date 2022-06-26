import React, { useState, useEffect } from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/Protected.route";

import LandingPage from "./pages/LandingPage";
import IssueUserID from "./pages/issueUserID/IssueUserID";
import HomePage from "./pages/HomePage";

import Home from "./pages";

require("dotenv").config();

function App() {
  const [items, setItems] = useState([]);
 
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/issueUserID" component={IssueUserID} />
          <ProtectedRoute path="/home" component={HomePage} />
          <Route path="*" component={PageNotFound} />
       
        </Switch>
      </Router> 
    </>
  );
}

export default App;
