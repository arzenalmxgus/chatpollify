import React, { createContext, useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SOCKET_SERVER_URL || 'https://socket-io-chat-app-demo.herokuapp.com/';
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('sendMessage', message);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};