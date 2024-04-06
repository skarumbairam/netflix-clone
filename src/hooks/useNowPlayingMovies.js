import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const nowPlaying = useSelector((store) => store.movies.nowPlayingMovies);
  //console.log("nowPlayingMovies Test", nowPlaying);

  const dispatch = useDispatch();

  const getNowPlayingMovieList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const movieList = await data.json();
    dispatch(addNowPlayingMovies(movieList.results));
  };

  useEffect(() => {
    getNowPlayingMovieList();
  }, []);
};

export default useNowPlayingMovies;
