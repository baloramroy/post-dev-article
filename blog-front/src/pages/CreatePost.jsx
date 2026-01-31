import React, { useState, useEffect } from "react";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err.response || err.message);
        setMessage('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const createCategory = async () => {
    if (!newCategory) return;
    try {
      const res = await api.post('/categories', { name: newCategory });
      setCategories(prev => [...prev, res.data]);
      setForm(prev => ({ ...prev, category: res.data._id }));
      setNewCategory('');
      setMessage(`Category "${res.data.name}" created and selected!`);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to create category');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!form.title || !form.content || !form.category) {
      setMessage('Title, content, and category are required');
      return;
    }

    try {
      await api.post('/posts', form);
      setMessage('Post created successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-2xl backdrop-blur-md bg-gray-800/80 border border-gray-700 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">Create a New Post</h1>

        {message && (
          <div className="bg-indigo-700/30 text-indigo-200 px-4 py-2 rounded mb-6 text-center border border-indigo-500">
            {message}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Post Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {/* Content */}
          <textarea
            placeholder="Post Content"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
          />

          {/* Category Select */}
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          {/* New Category */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button
              type="button"
              onClick={createCategory}
              className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition"
            >
              Create
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
