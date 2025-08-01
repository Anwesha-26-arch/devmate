import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const newEntry = { text: newTask.trim(), completed: false };
    setTasks([...tasks, newEntry]);
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const confirmDelete = window.confirm("Mark complete. Do you want to delete this task?");
    if (confirmDelete) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[index].completed = true;
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Task Manager</h2>
      <div className="mb-2 d-flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="form-control me-2"
        />
        <button onClick={addTask} className="btn btn-primary">Add</button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "text-decoration-line-through text-muted" : ""
            }`}
          >
            <span>{task.text}</span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
