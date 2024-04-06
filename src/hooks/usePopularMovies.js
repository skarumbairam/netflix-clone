import { useDispatch, useSelector } from "react-redux";
import { addPopulaMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const usePopularMovies = () => {
  const popularList = useSelector((store) => store.movies.popularMovies);
  //console.log("popularList Test", popularList);
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const movieList = await data.json();
    dispatch(addPopulaMovies(movieList.results));
  };

  useEffect(() => {
    !popularList && getPopularMovies();
  }, []);
};

export default usePopularMovies;
