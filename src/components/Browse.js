import React, { useState } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import HeroContainer from "./HeroContainer";
import BodyContainer from "./BodyContainer";
import GPTSearchContainer from "./GPTSearchContainer";
import { useSelector } from "react-redux";
import WatchMovie from "./WatchMovie";

const Browse = () => {
  const gptSearch = useSelector((store) => store.gptSearch.showGptSearch);
  const watchMovie = useSelector((store) => store.movies.watchMovie);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();

  return (
    <>
      <Header />
      {gptSearch ? (
        <GPTSearchContainer />
      ) : watchMovie ? (
        <WatchMovie />
      ) : (
        <>
          <HeroContainer />
          <BodyContainer />
        </>
      )}
    </>
  );
};

export default Browse;
