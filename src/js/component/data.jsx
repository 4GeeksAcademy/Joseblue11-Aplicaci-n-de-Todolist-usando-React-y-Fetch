import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";

const apiUrl = "https://playground.4geeks.com/todo"; 

const Home = () => {

  const [task, setTaskValue] = useState("");
  const [taskList, setTaskListValue] = useState([]);
  const [error, setError] = useState(null); 

  // Function to handle API calls
  const handleApiCall = async (url, method, data = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : null,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`); 
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      setError(error); 
    } finally {
      
    }
  };

  // Function to create a new task using Fetch
  const createTask = async () => {
    if (!task) return; 

    const url = `${apiUrl}`;
    const data = { task };

    const createdTask = await handleApiCall(url, "POST", data);
    if (createdTask) {
      setTaskListValue([...taskList, createdTask]);
      setTaskValue(""); 
    }
  };

  // Function to fetch all tasks using Fetch (useEffect hook)
  useEffect(() => {
    //const fetchTasks = async () => {
      //const url = `${apiUrl}` + "/users/Joseblue11";
      //const fetchedTasks = await handleApiCall(url);
      //if (fetchedTasks) {
        //setTaskListValue(fetchedTasks);
      //}
    //};

    




    fetchTasks();
  }, []); 

  
  const modifyTask = async (index, updatedTask) => {
    const taskId = taskList[index].id; 
    const url = `<span class="math-inline">\{API\_URL\}/</span>{taskId}`;

    const updatedData = await handleApiCall(url, "PUT", updatedTask);
    if (updatedData) {
      // Update task list with the modified data
      setTaskListValue((current) =>
        current.map((item, i) => (i === index ? updatedData : item))
      );
    }
  };

  // Function to remove a task by index using Fetch
  const removeTask = async (index) => {
    const taskId = taskList[index].id; 
    const url = `<span class="math-inline">\{API\_URL\}/</span>{taskId}`;

    await handleApiCall(url, "DELETE");

    // Update task list only if deletion was successful (handled in handleApiCall)
    setTaskListValue((current) => [
      ...current.slice(0, index),
      ...current.slice(index + 1, current.length),
    ]);
  };

  // Function to handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && task.length > 0 && task.length <= 40) {
      createTask(); // Call createTask instead of directly adding to state
    }
  };
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Aplicación de Todolist usando React y Fetch</h1>
      <img
        className="img-1 d-flex"
        src={rigoImage}
        style={{ width: "19rem", height: "16rem" }}
      />
      <div className="input-intems d-flex align-items-center justify-content-center align-content-center flex-wrap flex-direction-row w-100">
        <div className="input-group input-group-lg w-100">
          <label className="input-group-text rounded-0" htmlFor="inputTask">
            <i className="fas fa-tasks"></i>
          </label>
          <input
            type="text"
            id="inputTask"
            className="form-control rounded-0"
            placeholder="What needs to be done?"
            name="inputTask"
            maxLength="40"
            value={task}
            onChange={(e) => setTaskValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="inputTask"
            aria-describedby="basic-addon1"
          />
        </div>
        <ul className="list-group d-flex w-100">
          {/* Task list items will be rendered here */}
        </ul>
        <li className="list-group-item rounded-0 border w-50 text-muted">
          <small>
            {taskList.length} {taskList.length === 1 ? "item" : "items"} left
          </small>
        </li>
      </div>
      <p>Made by Jose Antonio Tovar with love!</p>
    </div>
  );
};

export default Home;
