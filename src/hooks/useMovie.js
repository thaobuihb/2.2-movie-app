import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

const useMovie = () => {
  const { state, setState } = useContext(MovieContext);

  function setMovie(data) {
    setState((prevState) => ({
      ...prevState,
      movieList: data, // Thay đổi state.movieList thành data
    }));
  }

  return {
    setMovie,
    movieList: state.movieList, // Sửa thành movieList
    isLoading: state.isLoading,
  };
};

export default useMovie;