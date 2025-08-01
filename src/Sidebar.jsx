import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ setSection }) => {
  return (
    <div className="bg-light p-3" style={{ minHeight: "100vh", width: "200px" }}>
      <h4 className="mb-5 fw-bold">DevMate</h4>
      <Nav className="flex-column">
        <Nav.Link onClick={() => setSection("repos")}>GitHub Repos</Nav.Link>
        <Nav.Link onClick={() => setSection("tasks")}>Tasks</Nav.Link>
        <Nav.Link onClick={() => setSection("pomodoro")}>Pomodoro</Nav.Link>
        <Nav.Link onClick={() => setSection("planner")}>Daily Planner</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
