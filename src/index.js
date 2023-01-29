import React from "react";
import ReactDOM from 'react-dom/client';
// import { createRoot } from "react-dom/client";
import  App  from "./app";
import { BrowserRouter} from 'react-router-dom';


const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <>
//         <App />
//   </>
// );
// ReactDOM.render(<App />, document.getElementById("root"));
