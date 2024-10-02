import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => boolean;
  logout: () => void;
  register: (userData: User) => void;
  registeredUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const login = (userData: User): boolean => {
    const isRegistered = registeredUsers.some(u => u.username === userData.username);
    if (isRegistered) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
  };

  const register = (userData: User): void => {
    setRegisteredUsers([...registeredUsers, userData]);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
};