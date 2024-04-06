import React, { useEffect, useState } from "react";

import { addWatchMovie } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailerId from "../hooks/useMovieTrailerId";
import { API_OPTIONS } from "../utils/constants";

function WatchMovie() {
  const dispatch = useDispatch();
  const [videoId, setVideoId] = useState(null);
  const getMovieDetails = useSelector((store) => store.movies?.watchMovie);

  const getMovieTrailers = async (id) => {
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
    setVideoId(trailerId);
  };

  useEffect(() => {
    getMovieTrailers(getMovieDetails.id);
  }, []);

  const closeHandler = () => {
    dispatch(addWatchMovie(null));
  };

  return (
    <div className="bg-black text-white mt-10 md:mt-0">
      <div className="flex justify-end p-5">
        <button
          onClick={closeHandler}
          className=" w-10 h-10 bg-white rounded-full text-black"
        >
          X
        </button>
      </div>
      <VidoContainer videoId={videoId} />
      <MovieDetailsContainer details={getMovieDetails} />
    </div>
  );
}

function VidoContainer({ videoId }) {
  return (
    <div className="w-1/2 mx-auto bg-black">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${videoId?.key}?&autoplay=1&mute=1&loop=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen="allowFullScreen"
      ></iframe>
    </div>
  );
}

function MovieDetailsContainer({ details }) {
  const { original_title, overview, release_date, vote_average, vote_count } =
    details;
  return (
    <div className="bg-white text-black px-8">
      <h2 className="font-semibold text-3xl py-2">{original_title}</h2>
      <p className="text-2xl py-2">{overview}</p>
      <p className="text-2xl py-2">
        {" "}
        <strong>Release Date :</strong> {release_date}
      </p>
      <p className="text-2xl py-2 pb-16">
        <strong>Review :</strong> {vote_average} / {vote_count}
      </p>
    </div>
  );
}

export default WatchMovie;
