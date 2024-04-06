import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = (id) => {
  const upcomingList = useSelector((store) => store.movies.upcomingMovies);
  // console.log("UpcomingList Test", upcomingList);
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const movieList = await data.json();
    dispatch(addUpcomingMovies(movieList.results));
  };
  useEffect(() => {
    !upcomingList && getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
