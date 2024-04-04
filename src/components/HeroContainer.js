import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMovieTrailerId from "../hooks/useMovieTrailerId";

const HeroContainer = () => {
  // fetch video trailer from top movie
  const moviesList = useSelector((store) => store.movies.nowPlayingMovies);
  if (!moviesList) return;

  const mainMovie = moviesList[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <>
      <HeroTitle title={original_title} description={overview} />
      <HeroBackground movieId={id} />
    </>
  );
};

const HeroTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video absolute px-8 pt-[10%] bg-gradient-to-r from-black text-white">
      <h1 className="font-bold text-4xl">{title}</h1>
      <p className="py-6 text-lg w-1/4">{description}</p>
      <div className="">
        <button className="py-2 px-6 bg-gray-200 rounded-md mx-2 text-black">
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
