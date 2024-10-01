import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // In a real app, you'd validate credentials here
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    // In a real app, you'd send this data to your backend
    // For now, we'll just set the user as if they've logged in
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};