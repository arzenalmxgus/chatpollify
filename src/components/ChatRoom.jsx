import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ChatRoom = () => {
  const { messages, sendMessage } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage(newMessage);
      setNewMessage('');
      toast.success('Message sent!');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Chat Room</h2>
      <div className="h-64 overflow-y-auto mb-4 bg-gray-700 p-4 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <span className="font-bold text-green-400">{msg.user}: </span>
            <span className="text-white">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2 bg-gray-700 text-white"
        />
        <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatRoom;