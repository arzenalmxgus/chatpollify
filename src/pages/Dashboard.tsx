import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { usePoll } from '../contexts/PollContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { messages, sendMessage } = useChat();
  const { poll, votes, createPoll, vote } = usePoll();
  const [newMessage, setNewMessage] = useState('');
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage({ user: user.username, text: newMessage });
      setNewMessage('');
    }
  };

  const handleCreatePoll = () => {
    if (newPollQuestion && newPollOptions) {
      const options = newPollOptions.split(',').map(option => option.trim());
      createPoll(newPollQuestion, options);
      setNewPollQuestion('');
      setNewPollOptions('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-500">Welcome, {user.username}!</h1>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</Button>
        </header>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Chat</h2>
            <div className="h-64 overflow-y-auto mb-4 bg-gray-800 p-4 rounded">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">{msg.user}: </span>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="flex">
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow mr-2 bg-gray-800"
              />
              <Button onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600">Send</Button>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Live Poll</h2>
            {poll ? (
              <div>
                <h3 className="text-xl mb-2">{poll.question}</h3>
                {poll.options.map((option) => (
                  <div key={option} className="mb-2">
                    <Button onClick={() => vote(option)} className="w-full mb-1 bg-gray-800 hover:bg-gray-700">
                      {option}
                    </Button>
                    <Progress value={(votes[option] / Object.values(votes).reduce((a, b) => a + b, 0)) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Input
                  type="text"
                  value={newPollQuestion}
                  onChange={(e) => setNewPollQuestion(e.target.value)}
                  placeholder="Poll question"
                  className="w-full mb-2 bg-gray-800"
                />
                <Input
                  type="text"
                  value={newPollOptions}
                  onChange={(e) => setNewPollOptions(e.target.value)}
                  placeholder="Options (comma-separated)"
                  className="w-full mb-2 bg-gray-800"
                />
                <Button onClick={handleCreatePoll} className="w-full bg-green-500 hover:bg-green-600">Create Poll</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;