import { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' });
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");

 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://stealth-taskmanager-project.onrender.com/api/tasks/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || "Failed to fetch tasks");
        setTasks(data.tasks);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, [token]);

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    const task = {
      ...newTask,
      status: 'incomplete',
      createdAt: new Date().toISOString(),
    };

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://stealth-taskmanager-project.onrender.com/api/tasks/newtask", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Failed to add task');

      setTasks([...tasks, data.task]); 
      setNewTask({ title: '', description: '', priority: 'Medium' });
      setSuccess('Task added successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    const taskToUpdate = tasks.find(task => task._id === id);
    const updatedStatus = taskToUpdate.status === 'complete' ? 'incomplete' : 'complete';

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`https://stealth-taskmanager-project.onrender.com/api/tasks/update/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: updatedStatus }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Failed to update task');

      setTasks(tasks.map(task =>
        task._id === id ? { ...task, status: updatedStatus } : task
      ));
      setSuccess('Task status updated!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`https://stealth-taskmanager-project.onrender.com/api/tasks/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Failed to delete task');

      setTasks(tasks.filter(task => task._id !== id));
      setSuccess('Task deleted successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return task.status === 'incomplete';
    if (filter === 'Completed') return task.status === 'complete';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Task Management</h1>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <div className="space-y-4">
            <input
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              type="text"
              placeholder="Title"
              className="w-full p-3 border rounded-xl"
            />
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Description"
              className="w-full p-3 border rounded-xl"
            ></textarea>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="w-full p-3 border rounded-xl"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button
              onClick={handleAddTask}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
            {success && <div className="flex items-center gap-2 text-green-600"><CheckCircleIcon className="w-5 h-5" />{success}</div>}
            {error && <div className="flex items-center gap-2 text-red-600"><XCircleIcon className="w-5 h-5" />{error}</div>}
          </div>
        </div>

        <div className="mb-4 flex gap-2 justify-center">
          {['All', 'Active', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm border ${filter === status ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {status}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {filteredTasks.map(task => (
            <li key={task._id} className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <div className="text-xs text-gray-500">
                  <p>Priority: <span className={`font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span></p>
                  <p>Status: <span className={task.status === 'complete' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>{task.status}</span></p>
                  <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-end">
                <button
                  onClick={() => handleToggleStatus(task._id)}
                  className="px-3 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700"
                >
                  {task.status === 'complete' ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
