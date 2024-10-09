import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Make sure this matches your server URL
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('activeUsers', (users) => {
      setActiveUsers(users);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('sendMessage', message);
      // Add the message to the local state immediately for instant feedback
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, activeUsers }}>
      {children}
    </ChatContext.Provider>
  );
};