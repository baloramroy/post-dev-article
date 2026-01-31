// import { createContext, useContext, useEffect, useState } from 'react';
// import api from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get('/auth/me')
//       .then(res => setUser(res.data))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, []);

//   const login = async (email, password) => {
//     await api.post('/auth/login', { email, password });
//     const res = await api.get('/auth/me');
//     setUser(res.data);
//   };

//   const logout = async () => {
//     await api.post('/auth/logout');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React from "react";
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is logged in by calling /users/me
  const checkAuth = async () => {
    try {
      const res = await api.get('/users/me');
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/auth/logout'); // Optional: call backend if you have a logout route
    } catch (err) {
      console.log("Logout error:", err);
    }
    setUser(null); // Clear user state
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
