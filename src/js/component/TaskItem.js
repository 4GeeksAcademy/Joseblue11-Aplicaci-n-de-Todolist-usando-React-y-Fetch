import React from "react";

const TaskItem = ({ task, onRemoveTask }) => {
  return (
    <li
      className="list-group-item rounded-0 border w-50 d-flex justify-content-between align-items-center task-none"
    >
      {task}
      <button
        className="btn btn-danger"
        type="button"
        onClick={onRemoveTask}
      >
        Eliminar
      </button>
    </li>
  );
};

export default TaskItem;
