import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';

const ChatRoom = () => {
  const { messages, sendMessage, activeUsers } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage({ user: user.username, text: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Chat Room</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-green-400">Active Users:</h3>
        <ul className="list-disc list-inside text-white">
          {activeUsers.map((activeUser, index) => (
            <li key={index}>{activeUser}</li>
          ))}
        </ul>
      </div>
      <div className="h-64 overflow-y-auto mb-4 bg-gray-700 p-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold text-green-400">{msg.user}: </span>
            <span className="text-white">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2 p-2 rounded bg-gray-700 text-white"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;