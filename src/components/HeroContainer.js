import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerId from "../hooks/useMovieTrailerId";
import { addWatchMovie } from "../utils/moviesSlice";

const HeroContainer = () => {
  // fetch video trailer from top movie
  const moviesList = useSelector((store) => store.movies.nowPlayingMovies);
  if (!moviesList) return;

  const mainMovie = moviesList[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="bg-black flex flex-col-reverse md:flex-col">
      <div>
        <HeroTitle title={original_title} description={overview} />
      </div>
      <div>
        <HeroBackground movieId={id} />
      </div>
    </div>
  );
};

const HeroTitle = ({ title, description }) => {
  //const watchMovie = useSelector((store) => store.movies.watchMovie);
  const nowPlayingMovie = useSelector((store) => store.movies.nowPlayingMovies);
  const dispatch = useDispatch();
  const watchVidehandler = () => {
    dispatch(addWatchMovie(nowPlayingMovie[0]));
  };

  return (
    <div className="w-screen aspect-video relative md:absolute px-8  md:pt-[15%] md:bg-gradient-to-r from-black text-white">
      <h1 className="py-2 mt-10 md:mt-0 md:py-0 font-bold md:font-bold text-1xl md:text-4xl">
        {title}
      </h1>
      <p className="pb-8 md:py-6 text-sm md:text-lg w-full md:w-1/4">
        {description}
      </p>
      <div className="">
        <button
          className="py-2 px-6 bg-gray-200 rounded-md mx-2 text-black"
          onClick={watchVidehandler}
        >
          ▶️ Play
        </button>
        <button className="py-2 px-6 bg-gray-500 rounded-md mx-2 bg-opacity-90 text-white">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

const HeroBackground = ({ movieId }) => {
  useMovieTrailerId(movieId);
  const trailerVideo = useSelector((store) => store.movies?.movieTrailerId);
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=1&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default HeroContainer;
