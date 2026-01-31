// import { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const [form, setForm] = useState({ username: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     await api.post('/auth/register', form);
//     navigate('/login');
//   };

//   return (
//     <form onSubmit={submit}>
//       <h1>Register</h1>
//       <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
//       <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
//       <button>Register</button>
//     </form>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Sign up to get started</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Your username"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Already have an account? <a href="/login" className="text-indigo-600 font-medium hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
