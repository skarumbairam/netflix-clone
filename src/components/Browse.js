import React, { useState } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import HeroContainer from "./HeroContainer";

const Browse = () => {
  useNowPlayingMovies();
  return (
    <>
      <Header />
      <HeroContainer />
    </>
  );
};

export default Browse;
