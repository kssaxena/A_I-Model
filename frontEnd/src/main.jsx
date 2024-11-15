import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./utils/Store.js";
// import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
