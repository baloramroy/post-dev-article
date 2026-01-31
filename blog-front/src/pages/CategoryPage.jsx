import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    if (!newCategory.trim()) {
      setMessage('Category name cannot be empty');
      return;
    }

    try {
      const res = await api.post('/categories', { name: newCategory });
      setCategories(prev => [...prev, res.data]);
      setNewCategory('');
      setMessage(`Category "${res.data.name}" created successfully!`);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to create category');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">

        {/* ================= Top Section: Create Category ================= */}
        <div className="backdrop-blur-md bg-gray-800/80 border border-gray-700 rounded-2xl shadow-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              Create New Category
            </h2>
            <p className="text-gray-400 mb-6">
              Add a new category to organize your posts.
            </p>

            {message && (
              <div className="bg-indigo-700/30 text-indigo-200 px-4 py-2 rounded mb-4 text-center border border-indigo-500">
                {message}
              </div>
            )}

            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
              <button
                onClick={createCategory}
                className="px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>

        {/* ================= Bottom Section: List Categories ================= */}
        <div className="backdrop-blur-md bg-gray-800/80 border border-gray-700 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Categories</h2>

          {categories.length === 0 ? (
            <p className="text-gray-400 text-center mt-4">No categories available.</p>
          ) : (
            <div className="space-y-4">
              {categories.map(cat => (
                <div
                  key={cat._id}
                  className="flex justify-between items-center p-4 rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm hover:border-green-500 transition"
                >
                  <span className="text-gray-100 font-medium">{cat.name}</span>
                  <small className="text-gray-400">
                    Created: {new Date(cat.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
