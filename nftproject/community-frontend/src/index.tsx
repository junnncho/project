import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/variable.css";
import "./assets/css/global.css";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <div>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
