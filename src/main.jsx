import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./MainApp";
import ThemeProvider from "./ThemeContext"; // ✅ Wrap App

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <MainApp />
  </ThemeProvider>
);
