import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function TaskItem({ task, index }) {
  const handleDelete = () => {
    let existingTasks = JSON.parse(localStorage.getItem('todolist')) || [];
    existingTasks.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(existingTasks));
    window.location.reload(); // Reload to reflect changes
  };

  const handleEdit = () => {
    // Implement edit functionality
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <AiOutlineDelete onClick={handleDelete} />
      <AiOutlineEdit onClick={handleEdit} />
    </div>
  );
}

export default TaskItem;
