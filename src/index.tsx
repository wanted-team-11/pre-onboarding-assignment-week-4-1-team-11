import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyles";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
