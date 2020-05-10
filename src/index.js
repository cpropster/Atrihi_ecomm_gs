import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/main.scss";

const root = document.querySelector("#root");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  root
);
