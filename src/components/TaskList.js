import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('todolist')) || [];
    setTasks(savedTasks);
  }, []);

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} />
      ))}
    </div>
  );
}

export default TaskList;
