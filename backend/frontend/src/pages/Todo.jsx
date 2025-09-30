import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [todo, setTodo] = useState([]);
  const [editingId, setEditingId] = useState(null); // For update

  const userId = sessionStorage.getItem('userId');
  const email = sessionStorage.getItem('email');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; // boolean

  // Fetch todos
  const fetchTodos = async () => {
     if (!isLoggedIn || !userId) {
      setTodo([]); // clear todos on logout
      return;
    }

    try {
      const res = await axios.get(`${window.location.origin}/api/list/getTasks/${userId}`);
      setTodo(res.data.list || []); // fallback to empty array
    } catch (error) {
      toast.error('Failed to fetch todos');
      setTodo([]);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [isLoggedIn, userId]); // refetch if login status changes

  // Add or Update todo
  const submitTodo = async (e) => {
    e.preventDefault();
    try {
      if (!isLoggedIn) {
        toast.error('You must be logged in to add tasks');
        return;
      }

      if (editingId) {
        await axios.put(`${window.location.origin}/api/list/updateTask/${editingId}`, { title, body, email });
        toast.success('Task updated');
        setEditingId(null);
      } else {
        await axios.post(`${window.location.origin}/api/list/addTask/`, { email, title, body });
        toast.success('Task added');
      }

      setTitle('');
      setBody('');
      setIsOpen(false);
      fetchTodos(); // refresh list
    } catch (error) {
      toast.error('Failed to add/update todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    if (!isLoggedIn) return toast.error('You must be logged in to delete tasks');

    try {
      await axios.delete(`${window.location.origin}/api/list/deleteTask/${id}`, { data: { email } });
      toast.success('Task deleted');
      fetchTodos();
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  // Start editing
  const editTodo = (todoItem) => {
    setTitle(todoItem.title);
    setBody(todoItem.body);
    setEditingId(todoItem._id);
    setIsOpen(true);
  };

  return (
    <div className="p-4">
      {/* Floating Add Button */}
      <div
        className="h-14 w-14 rounded-full bg-purple-600 text-white text-3xl font-bold fixed bottom-6 right-6 flex items-center justify-center cursor-pointer shadow-lg hover:bg-purple-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        +
      </div>

      {/* Form */}
      {isOpen && (
        <div className="w-full flex items-center justify-center">
          <form
            className="bg-gray-900 text-white flex flex-col gap-4 mt-20 p-6 rounded-xl shadow-lg w-[90%] max-w-xl"
            onSubmit={submitTodo}
          >
            <h2 className="text-2xl font-bold text-center">
              {editingId ? 'Update To-Do' : 'Add a To-Do'}
            </h2>

            <input
              type="text"
              placeholder="Enter title here"
              className="bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Enter the body"
              rows={5}
              className="bg-gray-800 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 py-2 rounded-lg font-semibold transition"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      )}

      {/* Todo List */}
      <div className="mt-10 flex flex-col gap-4 max-w-xl mx-auto">
        {todo.length === 0 && <p className="text-white text-center">No tasks yet</p>}
        {todo.map((t) => (
          <div key={t._id} className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white">{t.title}</h3>
              <p className="text-gray-300">{t.body}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => editTodo(t)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(t._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
