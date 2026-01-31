import React from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

// export default function Navbar() {
//   const { user } = useContext(AuthContext);

//   return (
//     <nav style={{ padding: "15px", borderBottom: "1px solid #ddd" }}>
//       <Link to="/" style={{ marginRight: "15px" }}>Home</Link>

//       {!user && (
//         <>
//           <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
//           <Link to="/register">Register</Link>
//         </>
//       )}

//       {user && (
//         <>
//           <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
//           <Link to="/create" style={{ marginRight: '15px' }}>Create Post</Link>
//           <Link to="/categories" style={{ marginRight: '15px' }}>Categories</Link>
//         </>
//       )}
//     </nav>
//   );
// }

// ----

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition"
        >
          MyBlog
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
          >
            Home
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg text-white"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </Link>

              <Link
                to="/create"
                className="text-gray-300 hover:text-white transition"
              >
                Create
              </Link>

              <Link
                to="/categories"
                className="text-gray-300 hover:text-white transition"
              >
                Categories
              </Link>

              <button
                onClick={logout}
                className="border border-gray-700 hover:border-red-500 hover:text-red-400 transition px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


