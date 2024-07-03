import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

const useMovie = () => {
  const { state, setState } = useContext(MovieContext);

  function setMovie(data) {
    setState((prevState) => ({
      ...prevState,
      movieList: data, 
    }));
  }

  return {
    setMovie,
    movieList: state.movieList, 
    isLoading: state.isLoading,
  };
};

export default useMovie;