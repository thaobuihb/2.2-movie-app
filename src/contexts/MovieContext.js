import React, { useState, createContext } from "react";


const MovieContext = createContext();

const defaultValues = {
  movieList: [],
  isLoading: false,
};

const MovieProvider = ({ children }) => {
  const [state, setState] = useState(defaultValues);
  return (
    <MovieContext.Provider value={{ state, setState }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };