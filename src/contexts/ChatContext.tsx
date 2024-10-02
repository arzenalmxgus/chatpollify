import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface Message {
  user: string;
  text: string;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => useContext(ChatContext)!;

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const mockSocket = {
      send: (message: string) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(message)]);
      },
    };
    setSocket(mockSocket);

    return () => {
      // Clean up socket connection
    };
  }, []);

  const sendMessage = (message: Message): void => {
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