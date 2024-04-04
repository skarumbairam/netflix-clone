import React, { useState } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import HeroContainer from "./HeroContainer";
import BodyContainer from "./BodyContainer";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  return (
    <>
      <Header />
      <HeroContainer />
      <BodyContainer />
    </>
  );
};

export default Browse;
