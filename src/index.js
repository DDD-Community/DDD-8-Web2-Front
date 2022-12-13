import React from "react";
// import ReactDOM from "react-dom";
import * as ReactDOM from "react-dom/client";
// import { App } from "./app";
import KakaoMap from "./pages/kakaoMap.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <KakaoMap />
  </>
);
// ReactDOM.render(<App />, document.getElementById("root"));
