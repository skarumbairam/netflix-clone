import React from "react";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../utils/constants";

const BodyContainer = () => {
  console.log("Body Container");
  const movies = useSelector((store) => store.movies);
  if (!movies) return;
  const { nowPlayingMovies, popularMovies, upcomingMovies } = movies;

  return (
    <div className=" text-white bg-black">
      <div className="-mt-56 relative z-10 pl-8">
        <MovieList title={"Upcoming Movies"} movies={upcomingMovies} />
        <MovieList title={"Now Playing Movies"} movies={nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={popularMovies} />
      </div>
    </div>
  );
};

const MovieList = ({ title, movies }) => {
  return (
    <div className="py-4">
      <h3 className="text-2xl font-bold pb-2">{title}</h3>
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 p-2">
      <img src={`${IMAGE_BASE_URL}/${posterPath}`} alt="MovieCard" />
    </div>
  );
};

export default BodyContainer;
