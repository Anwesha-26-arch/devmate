// src/PomodoroTimer.jsx
import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";

const PomodoroTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [mode, setMode] = useState("work"); // 'work' or 'break'
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            audioRef.current.play();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    if (mode === "work") {
      setTimeLeft(workMinutes * 60);
    } else {
      setTimeLeft(breakMinutes * 60);
    }
  };

  const handleTimeChange = (e, type) => {
    const value = parseInt(e.target.value) || 0;
    if (type === "work") {
      setWorkMinutes(value);
      if (mode === "work") setTimeLeft(value * 60);
    } else {
      setBreakMinutes(value);
      if (mode === "break") setTimeLeft(value * 60);
    }
  };

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    setMode(selectedMode);
    setTimeLeft(selectedMode === "work" ? workMinutes * 60 : breakMinutes * 60);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Pomodoro Timer</Card.Title>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Work Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => handleTimeChange(e, "work")}
              disabled={isRunning}
            />
          </Col>
          <Col md={6}>
            <Form.Label>Break Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={breakMinutes}
              onChange={(e) => handleTimeChange(e, "break")}
              disabled={isRunning}
            />
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Mode</Form.Label>
          <Form.Select
            value={mode}
            onChange={handleModeChange}
            disabled={isRunning}
          >
            <option value="work">Work</option>
            <option value="break">Break</option>
          </Form.Select>
        </Form.Group>

        <h2 className="my-3 text-center">{formatTime(timeLeft)}</h2>

        <div className="text-center">
          {!isRunning ? (
            <Button variant="success" onClick={handleStart} className="me-2">
              Start
            </Button>
          ) : (
            <Button variant="warning" onClick={handlePause} className="me-2">
              Pause
            </Button>
          )}
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
        </div>

        <audio ref={audioRef}>
          <source src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" type="audio/ogg" />
        </audio>
      </Card.Body>
    </Card>
  );
};

export default PomodoroTimer;
