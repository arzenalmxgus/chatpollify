import React, { createContext, useState, useContext } from 'react';

const PollContext = createContext();

export const usePoll = () => useContext(PollContext);

export const PollProvider = ({ children }) => {
  const [poll, setPoll] = useState(null);
  const [votes, setVotes] = useState({});

  const createPoll = (question, options) => {
    setPoll({ question, options });
    setVotes(Object.fromEntries(options.map(option => [option, 0])));
  };

  const vote = (option) => {
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