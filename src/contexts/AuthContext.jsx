import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const login = (userData) => {
    const isRegistered = registeredUsers.some(u => u.username === userData.username);
    if (isRegistered) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    setRegisteredUsers([...registeredUsers, userData]);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
};