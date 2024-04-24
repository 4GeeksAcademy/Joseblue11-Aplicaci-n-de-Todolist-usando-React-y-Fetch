import React, { useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
const ToDoList = () => {
  // State variables
  const [task, setTaskValue] = useState("");
  const [taskList, setTaskListValue] = useState([]);

  // Function to handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && task.length > 0 && task.length <= 40) {
      setTaskListValue([...taskList, task]); // Add new task to list
      setTaskValue(""); // Clear input field
    }
  };

  // Function to remove a task by index
  const removeTask = (index) => {
    setTaskListValue((current) => [
      ...current.slice(0, index),
      ...current.slice(index + 1, current.length),
    ]);
  };

  // JSX code to render the UI
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Aplicación de Todolist usando React y Fetch</h1>
      <img
        className="img-1 d-flex"
        src={rigoImage}
        style={{ width: "19rem", height: "16rem" }}
      />
      <div div className="input-intems d-flex align-items-center justify-content-center align-content-center flex-wrap flex-direction-row w-100" >
        <div className="input-group input-group-lg w-100">
          <label className="input-group-text rounded-0" htmlFor="inputTask">
            <i className="fas fa-tasks"></i>{" "}
            {/* Assuming you have FontAwesome set up */}
          </label>
          <input
            type="text"
            id="inputTask"
            className="form-control rounded-0"
            placeholder="What needs to be done?"
            name="inputTask"
            maxLength={"40"}
            value={task}
            onChange={(e) => setTaskValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="inputTask"
            aria-describedby="basic-addon1"
          />
        </div>
        <ul className="list-group d-flex w-100">
          {taskList.map((element, index) => (
            <li
              key={index}
              className="list-group-item rounded-0 border w-50 d-flex justify-content-between align-items-center task-none"
            >
              {element}
              <button
                type="button"
                onClick={() => removeTask(index)}
                className="btn btn-danger"
              >
                X
              </button>
            </li>
          ))}
          <li className="list-group-item rounded-0 border w-50 text-muted">
            <small>
              {taskList.length} {taskList.length === 1 ? "item" : "items"} left
            </small>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
