import React from "react";
import ReactDOM from "react-dom/client";
import store from "./core/store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./core/routes";
import routes from "./core/routes";
import Layout from "./components/layout/public/layout";
import App from "./App";
import "./assets/fonts/Roboto-Regular.ttf";
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={browserRouter} />
  </Provider>
);
