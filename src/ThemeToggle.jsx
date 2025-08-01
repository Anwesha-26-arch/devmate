// src/ThemeToggle.jsx
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Form } from "react-bootstrap";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="text-center mb-3">
      <Form.Check
        type="switch"
        id="theme-switch"
        label={theme === "light" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeToggle;
