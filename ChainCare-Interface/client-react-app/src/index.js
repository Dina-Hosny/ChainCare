import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import App from "./App";

import dotenv from "dotenv";
dotenv.config();

ReactDOM.render(<App />, document.getElementById("root"));
