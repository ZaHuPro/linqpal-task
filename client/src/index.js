import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import Landing from "./views/Landing";
import Admin from "./views/Admin";

const App = () => {
  return (
    <Router>
      <div className="content-box row">
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
