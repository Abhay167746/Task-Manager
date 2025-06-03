import React from 'react';

const TaskItem = ({ task, toggleDone, deleteTask }) => {
  const priorityColor = {
    Low: 'text-green-600',
    Normal: 'text-yellow-600',
    High: 'text-red-600'
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow">
      <div>
        <p
          className={`text-md font-medium ${task.done ? 'line-through text-gray-400' : ''}`}
        >
          {task.text}
        </p>
        <span className={`text-sm ${priorityColor[task.priority]}`}>
          {task.priority} Priority
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => toggleDone(task.id)}
          className="text-blue-600 hover:underline text-sm"
        >
          {task.done ? 'Undo' : 'Done'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
