// src/MainApp.jsx
import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import GitHubRepos from "./GitHubRepos";
import TaskManager from "./TaskManager";
import PomodoroTimer from "./PomodoroTimer";
import DailyPlanner from "./DailyPlanner";
import CodeSnippetSaver from "./CodeSnippetSaver";
import ThemeToggle from "./ThemeToggle";
import "./App.css";

const MainApp = () => {
  const [activeSection, setActiveSection] = useState("repos");

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h4 className="text-center mb-3">DevMate</h4>
        <ThemeToggle />
        <Nav className="flex-column mt-3">
          <Nav.Link onClick={() => scrollTo("repos")} className={activeSection === "repos" ? "active" : ""}>
            GitHub Repos
          </Nav.Link>
          <Nav.Link onClick={() => scrollTo("tasks")} className={activeSection === "tasks" ? "active" : ""}>
            Task Manager
          </Nav.Link>
          <Nav.Link onClick={() => scrollTo("pomodoro")} className={activeSection === "pomodoro" ? "active" : ""}>
            Pomodoro Timer
          </Nav.Link>
          <Nav.Link onClick={() => scrollTo("planner")} className={activeSection === "planner" ? "active" : ""}>
            Daily Planner
          </Nav.Link>
          <Nav.Link onClick={() => scrollTo("snippets")} className={activeSection === "snippets" ? "active" : ""}>
            Code Snippets
          </Nav.Link>
          <Nav.Link
  onClick={() => scrollTo("chatgpt")}
  className={activeSection === "chatgpt" ? "active" : ""}
>
  ChatGPT
</Nav.Link>

        </Nav>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Container fluid className="px-3 px-md-4">
          <h1 className="text-center mb-5">Welcome to DevMate</h1>

          <Row className="mb-4 g-4">
            <Col xs={12} md={6} id="repos">
              <GitHubRepos username="Anwesha-26-arch" />
            </Col>
            <Col xs={12} md={6} id="tasks">
              <TaskManager />
            </Col>
          </Row>

          <Row className="mb-4 g-4">
            <Col xs={12} md={6} id="pomodoro">
              <PomodoroTimer />
            </Col>
            <Col xs={12} md={6} id="planner">
              <DailyPlanner />
            </Col>
          </Row>

          <Row className="mb-4" id="snippets">
            <Col xs={12}>
              <CodeSnippetSaver />
            </Col>
          </Row>
          <Row className="mb-4" id="chatgpt">
  <Col md={12}>
    <div className="card text-center">
      <h5>💬 ChatGPT Assistant</h5>
      <p>You can open ChatGPT in a new tab to ask questions or get help anytime.</p>
      <button
        className="btn btn-primary"
        onClick={() => window.open("https://chat.openai.com", "_blank")}
      >
        🚀 Launch ChatGPT
      </button>
    </div>
  </Col>
</Row>

        </Container>
      </main>
    </div>
  );
};

export default MainApp;
