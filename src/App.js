import React, { useState } from 'react';
import './App.css';

const TaskForm = ({ onSave, onCancel, taskToEdit }) => {
  const [task, setTask] = useState({
    id: taskToEdit ? taskToEdit.id : null,
    name: taskToEdit ? taskToEdit.name : '',
    description: taskToEdit ? taskToEdit.description : '',
    date: taskToEdit ? taskToEdit.date : '',
    time: taskToEdit ? taskToEdit.time : '',
    assignedUser: taskToEdit ? taskToEdit.assignedUser : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(task);
    setTask({
      id: null,
      name: '',
      description: '',
      date: '',
      time: '',
      assignedUser: ''
    });
  };

  return (
    <div className="task-form">
      <h2>{taskToEdit ? 'Edit Task' : 'Add Task'}</h2>
      <label>
        Task Name:
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <br />
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Time:
        <input
          type="time"
          name="time"
          value={task.time}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Assigned User:
        <input
          type="text"
          name="assignedUser"
          value={task.assignedUser}
          onChange={handleChange}
        />
      </label>
      <br />
      <div>
        <button className="save-button" onClick={handleSave}>
          {taskToEdit ? 'Update' : 'Save'}
        </button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const Task = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>Date: {task.date}</p>
      <p>Time: {task.time}</p>
      <p>Assigned User: {task.assignedUser}</p>
      <div>
        <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleSaveTask = (task) => {
    if (task.id) {
      const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
      setTasks(updatedTasks);
    } else {
      const newTask = { ...task, id: Date.now() };
      setTasks([...tasks, newTask]);
    }
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app">
      <h1>Task Management</h1>
      {editingTask ? (
        <TaskForm
          onSave={handleSaveTask}
          onCancel={handleCancelEdit}
          taskToEdit={editingTask}
        />
      ) : (
        <TaskForm onSave={handleSaveTask} onCancel={handleCancelEdit} />
      )}

      <div className="task-list">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
