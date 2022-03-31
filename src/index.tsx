import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";
import { Theme } from "./hooks/with-theme";
import { Router } from "./hooks/router";

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Router />
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);
