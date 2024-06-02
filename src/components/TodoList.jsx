import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [sortType, setSortType] = useState('insertion');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false, id: Date.now() }]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const sortTasks = (type) => {
    let sortedTasks = [...tasks];
    if (type === 'alphabetical') {
      sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
    } else if (type === 'insertion') {
      sortedTasks.sort((a, b) => a.id - b.id);
    }
    setTasks(sortedTasks);
    setSortType(type);
  };

  const filteredTasks = () => {
    return tasks;
  };

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-indigo-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">Track Your Tasks</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            className="p-2 border rounded w-full"
            placeholder="Write Todo..."
          />
          <button
            onClick={addTask}
            className="mt-2 p-2 bg-orange-500 text-white rounded w-full"
          >
            Add
          </button>
        </div>
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => sortTasks('alphabetical')}
            className={`p-2 ${sortType === 'alphabetical' ? 'bg-green-700' : 'bg-green-500'} text-white rounded`}
          >
            Sort Alphabetically
          </button>
          <button
            onClick={() => sortTasks('insertion')}
            className={`p-2 ${sortType === 'insertion' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded`}
          >
            Sort by Insertion
          </button>
        </div>
        <ul>
          {filteredTasks().map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-purple-300 p-2 mb-2 rounded"
            >
              <span className={`${task.completed ? 'line-through' : ''}`}>{task.text}</span>
              <div>
                <button
                  onClick={() => toggleCompletion(index)}
                  className="ml-2 text-green-500"
                >
                  ✔️
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="ml-2 text-red-500"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
