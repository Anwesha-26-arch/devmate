import React, { useState, useEffect } from "react";

const DailyPlanner = () => {
  const [plans, setPlans] = useState(() => {
    const saved = localStorage.getItem("dailyPlans");
    return saved ? JSON.parse(saved) : [];
  });
  const [newSubtask, setNewSubtask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    localStorage.setItem("dailyPlans", JSON.stringify(plans));

    const today = new Date().toISOString().split("T")[0];
    plans.forEach((plan) => {
      if (plan.notify && plan.date === today) {
        new Notification("Reminder", {
          body: `📅 ${plan.subtask} is scheduled for today!`,
        });
      }
    });
  }, [plans]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const addPlan = () => {
    if (!newSubtask || !newDate) return;
    const newPlan = {
      id: Date.now(),
      subtask: newSubtask,
      date: newDate,
      notify,
    };
    setPlans([...plans, newPlan]);
    setNewSubtask("");
    setNewDate("");
    setNotify(false);
  };

  const toggleDelete = (id) => {
    const keep = window.confirm("Mark completed. Do you want to keep this plan?");
    if (!keep) {
      setPlans(plans.filter((plan) => plan.id !== id));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="mb-3">🗓️ Daily Planner</h2>
      <div className="d-flex mb-3 gap-2">
        <input
          type="text"
          placeholder="Subtask"
          className="form-control"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <div className="form-check align-self-center">
          <input
            type="checkbox"
            className="form-check-input"
            id="notifyCheck"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="notifyCheck">
            Notify
          </label>
        </div>
        <button onClick={addPlan} className="btn btn-success">
          Add Plan
        </button>
      </div>
      <ul className="list-group">
        {plans.map((plan) => (
          <li key={plan.id} className="list-group-item d-flex justify-content-between">
            <div>
              ✅ {plan.subtask} — <small>{plan.date}</small>
              {plan.notify && <span className="badge bg-info ms-2">🔔</span>}
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => toggleDelete(plan.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyPlanner;
