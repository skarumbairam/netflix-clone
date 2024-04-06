import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../utils/constants";
import { addWatchMovie } from "../utils/moviesSlice";
import { enableGptSearch } from "../utils/gptSlice";
const BodyContainer = () => {
  const movies = useSelector((store) => store.movies);
  if (!movies) return;
  const { nowPlayingMovies, popularMovies, upcomingMovies } = movies;
  return (
    <div className="text-white bg-black">
      <div className="md:-mt-52 relative z-10 px-4 md:px-8">
        <MovieList title={"Upcoming Movies"} movies={upcomingMovies} />
        <MovieList title={"Now Playing Movies"} movies={nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={popularMovies} />
      </div>
    </div>
  );
};

export const MovieList = ({ title, movies }) => {
  if (!movies) return;
  return (
    <div className="py-4">
      <h3 className="text-2xl font-bold pb-2">{title}</h3>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};
export const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  if (!movie) return null;
  const { poster_path } = movie;
  const watchMovieHandler = () => {
    dispatch(addWatchMovie(movie));
    dispatch(enableGptSearch(false));
  };
  return (
    <div
      className="w-40 md:w-48 p-2 bg-white m-1 bg-opacity-30 cursor-pointer"
      onClick={watchMovieHandler}
    >
      <img src={`${IMAGE_BASE_URL}/${poster_path}`} alt="MovieCard" />
    </div>
  );
};

export default BodyContainer;
