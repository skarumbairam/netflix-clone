import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailerId } from "../utils/moviesSlice";

const useMovieTrailerId = (id) => {
  const dispatch = useDispatch();
  const getMovieTrailers = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      API_OPTIONS
    );
    const jsonData = await data.json();
    const filteredData = jsonData.results.filter(
      (item) => item.type === "Trailer"
    );
    const trailerId =
      filteredData.length > 0 ? filteredData[0] : jsonData.results[0];
    dispatch(addMovieTrailerId(trailerId));
  };
  useEffect(() => {
    getMovieTrailers();
  }, []);
};

export default useMovieTrailerId;
