// import React from "react";
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import PostDetails from './pages/PostDetails';
// import CategoryPosts from './pages/CategoryPosts';
// import AuthorProfile from './pages/AuthorProfile';

// // Second phase

// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import CreatePost from './pages/CreatePost';
// import ProtectedRoute from './components/ProtectedRoute';


// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/post/:id" element={<PostDetails />} />
//       <Route path="/category/:id" element={<CategoryPosts />} />
//       <Route path="/author/:id" element={<AuthorProfile />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route path="/dashboard" element={
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       } />

//       <Route path="/create" element={
//         <ProtectedRoute>
//           <CreatePost />
//         </ProtectedRoute>
//       } />
//     </Routes>
//   );
// }

// export default App;



// -------- src/App.jsx (update for auth pages & dashboard) --------

// import React from "react";
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import PostDetails from './pages/PostDetails';
// import CategoryPosts from './pages/CategoryPosts';
// import AuthorProfile from './pages/AuthorProfile';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';


// function App() {
// return (
// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/post/:id" element={<PostDetails />} />
// <Route path="/category/:id" element={<CategoryPosts />} />
// <Route path="/author/:id" element={<AuthorProfile />} />
// <Route path="/login" element={<Login />} />
// <Route path="/register" element={<Register />} />
// <Route path="/dashboard" element={<Dashboard />} />
// </Routes>
// );
// }

// export default App;

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