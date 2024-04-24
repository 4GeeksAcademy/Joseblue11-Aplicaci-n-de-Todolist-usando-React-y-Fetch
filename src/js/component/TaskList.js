import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onRemoveTask }) => {
  return (
    <ul className="list-group d-flex w-100">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} onRemoveTask={() => onRemoveTask(index)} />
      ))}
    </ul>
  );
};

export default TaskList;
