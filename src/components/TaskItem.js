import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function TaskItem({ task, index, onDelete, onEdit }) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <AiOutlineDelete onClick={() => onDelete(index)} />
      <AiOutlineEdit onClick={() => onEdit(index)} />
    </div>
  );
}

export default TaskItem;

