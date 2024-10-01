import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // In a real app, you'd connect to a real WebSocket server
    const mockSocket = {
      send: (message) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(message)]);
      },
    };
    setSocket(mockSocket);

    return () => {
      // Clean up socket connection
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};