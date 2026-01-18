import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Normal');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, priority, done: false }
    ]);
    setNewTask('');
    setPriority('Normal');
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md">
        
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          📝 Task Manager
        </h1>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />

          <select
            className="border rounded-lg px-3 py-2 cursor-pointer"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option className="cursor-pointer">Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length ? (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                toggleDone={toggleDone}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm">
              No tasks yet!
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
