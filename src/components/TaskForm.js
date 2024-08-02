import React, { useState } from 'react';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateTask = () => {
    let existingTasks = JSON.parse(localStorage.getItem('todolist')) || [];
    
    if (editIndex !== null) {
      existingTasks[editIndex] = { title, description };
      setEditIndex(null);
    } else {
      existingTasks.push({ title, description });
    }
    
    localStorage.setItem('todolist', JSON.stringify(existingTasks));
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleAddOrUpdateTask}>
        {editIndex !== null ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  );
}

export default TaskForm;
