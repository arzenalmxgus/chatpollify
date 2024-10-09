import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import ChatRoom from '../components/ChatRoom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-500">Welcome, {user.username}!</h1>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</Button>
        </header>

        <ChatRoom />
      </div>
    </div>
  );
};

export default Dashboard;