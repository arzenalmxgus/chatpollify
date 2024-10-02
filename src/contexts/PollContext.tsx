import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Poll {
  question: string;
  options: string[];
}

interface PollContextType {
  poll: Poll | null;
  votes: Record<string, number>;
  createPoll: (question: string, options: string[]) => void;
  vote: (option: string) => void;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const usePoll = (): PollContextType => useContext(PollContext)!;

interface PollProviderProps {
  children: ReactNode;
}

export const PollProvider: React.FC<PollProviderProps> = ({ children }) => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({});

  const createPoll = (question: string, options: string[]): void => {
    setPoll({ question, options });
    setVotes(Object.fromEntries(options.map(option => [option, 0])));
  };

  const vote = (option: string): void => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1
    }));
  };

  return (
    <PollContext.Provider value={{ poll, votes, createPoll, vote }}>
      {children}
    </PollContext.Provider>
  );
};