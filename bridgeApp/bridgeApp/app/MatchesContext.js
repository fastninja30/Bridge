import React, { createContext, useState, useContext } from 'react';

const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);

  const addMatch = (profile) => {
    // Optionally, prevent duplicate matches
    setMatches((prevMatches) => {
      if (prevMatches.find((m) => m.id === profile.id)) {
        return prevMatches;
      }
      return [...prevMatches, profile];
    });
  };

  return (
    <MatchesContext.Provider value={{ matches, addMatch }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => useContext(MatchesContext);
