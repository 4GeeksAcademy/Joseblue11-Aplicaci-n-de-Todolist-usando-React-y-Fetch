import React, { useState } from "react";

const TaskInput = ({ onCreateTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task) {
      onCreateTask(task);
      setTask(""); // Clear input field
    }
  };

  return (
    <div className="input-items d-flex align-items-center justify-content-center align-content-center flex-wrap flex-direction-row w-100">
      <div className="input-group input-group-lg w-100">
        <label className="input-group-text rounded-0" htmlFor="inputTask">
          <i className="fas fa-tasks"></i>{" "}
        </label>
        <input
          type="text"
          id="inputTask"
          className="form-control rounded-0"
          placeholder="What needs to be done?"
          name="inputTask"
          maxLength={"40"}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="inputTask"
          aria-describedby="basic-addon1"
        />
        <button
          className="btn btn-primary rounded-0"
          type="button"
          onClick={handleSubmit}
        >
          Agregar tarea
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
