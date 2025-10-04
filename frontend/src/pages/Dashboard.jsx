import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    nav('/');
  };

  async function loadUser() {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data.user);
    } catch (e) {
      nav('/login');
    }
  }

  async function loadNotes(q = '') {
    const res = await API.get('/notes', { params: { q } });
    console.log(res.data)
    setNotes(res.data);
  }

  async function addNote(e) {
    e.preventDefault();
    if (!title || !content) return;
    
    await API.post('/notes', { title,content });
    setTitle('');
    setContent('');
    loadNotes();
  }

  async function updateNote(note) {
    const newTitle = prompt('Edit title:', note.title);
    const newContent = prompt('Edit content:', note.content);
    if (newTitle !== null && newContent !== null) {
      await API.put(`/notes/${note._id}`, { title: newTitle, content: newContent });
      loadNotes();
    }
  }

  async function removeNote(id) {
    await API.delete(`/notes/${id}`);
    loadNotes();
  }

  useEffect(() => {
    loadUser();
    loadNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">Notes Dashboard</h2>
        <div className="flex items-center space-x-4">
         
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Note Form */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <form onSubmit={addNote} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            Add Note
          </button>
        </form>
      </div>

    
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((n) => (
          <div
            key={n._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{n.title}</h3>
              <p className="text-gray-600 mt-2">{n.content}</p>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => updateNote(n)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => removeNote(n._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
