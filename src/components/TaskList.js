import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todolist')) || [];
    setTasks(savedTasks);
  }, []);

  const handleDelete = (index) => {
    let updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const handleEdit = (index) => {
    // Implement edit functionality here or pass to another component
  };

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
