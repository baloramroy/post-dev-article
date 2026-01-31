
// --------------------------------------------------------------------

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css'; // <--- Tailwind CSS imported here


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import CategoryPage from './pages/CategoryPage';
import CategoryPosts from "./pages/CategoryPosts";
import AuthorProfile from './pages/AuthorProfile';


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categorypost" element={<CategoryPosts />} />
        <Route path="/author/:id" element={<AuthorProfile />} />
      </Routes>
    </>
  );
}

export default App;


// ------------------------------------------------------------------------