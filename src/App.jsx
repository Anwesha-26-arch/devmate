import React from "react";
import ThemeProvider from "./ThemeContext";
import MainApp from "./MainApp";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
