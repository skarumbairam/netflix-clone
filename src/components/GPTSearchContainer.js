import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGPTMovieResults } from "../utils/gptSlice";
import languageConfig from "../utils/languageConfig";
//import openai from "../utils/openai";
import OpenAI from "openai";
import { API_OPTIONS } from "../utils/constants";
import { MovieList } from "./BodyContainer";

const GPTSearchContainer = () => {
  return (
    <div className="container-full">
      <div className="md:w-3/5  md:m-auto mt-20 md:mt-0">
        <SearchComponent />
      </div>
      <GptMovieSuggestions />
    </div>
  );
};

const SearchComponent = () => {
  const currLanguage = useSelector((store) => store.langConfig.language);
  const searchTextRef = useRef(null);
  const AI_API_KEY = useRef(null);
  const dispatch = useDispatch();

  const [apiKey, setApiKey] = useState("");
  const [searchText, setSearchText] = useState("");

  const searchMovieTMTB = async (movieName) => {
    // make api call and retrun  the result
    const movieSearchApi = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const data = await fetch(movieSearchApi, API_OPTIONS);
    const movie = await data.json();
    return movie.results;
  };

  const searchSubmidHandler = async () => {
    console.log(searchTextRef.current.value);

    // TODO Validation for empty string
    if (AI_API_KEY === "") {
      return;
    }

    // Clear existing result
    dispatch(
      addGPTMovieResults({
        movieNames: null,
        movieResults: null,
      })
    );

    // Initiate GPT API
    const openai = new OpenAI({
      apiKey: AI_API_KEY.current.value,
      dangerouslyAllowBrowser: true,
    });

    // Make API Call to fet movie list
    const gptQuery =
      "Act as Movie Recomendation system and suggest for the query :" +
      searchTextRef.current.value +
      " Only give me names of 5 movies, comma seperated like example given here. Example Results: Kathi, Don, Sholay, Golmal, Master ";

    setSearchText("");
    setApiKey("");
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO ERROR HANDLING
    }
    const gptMovieResult =
      gptResults?.choices?.[0]?.message?.content.split(",");
    // Search Each Movie From TMTB ['Sivaji', ' Baahubali', ' Muthu', ' 7G Rainbow Colony', ' Vada Chennai']
    const promiseArray = gptMovieResult.map((movie) => searchMovieTMTB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    // Dispatch to store
    dispatch(
      addGPTMovieResults({
        movieNames: gptMovieResult,
        movieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="flex items-center justify-center mt-11">
      <div className="w-full flex bg-black p-2">
        <input
          ref={AI_API_KEY}
          className="p-4 m-2 rounded w-1/2 text-xl"
          type="text"
          placeholder="Enter Your OpenAI API Key"
          value={apiKey}
          required
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />

        <input
          className="p-4 m-2 rounded w-3/4"
          type="text"
          placeholder={languageConfig[currLanguage].placeholder}
          ref={searchTextRef}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          className="w-1/4 m-2 p-4 bg-red-700 text-white rounded"
          onClick={searchSubmidHandler}
        >
          {languageConfig[currLanguage].search}
        </button>
      </div>
    </div>
  );
};

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gptSearch);
  if (!movieResults || !movieNames) return;

  return (
    <div className="bg-black bg-opacity-90 mt-2 text-white px-4">
      {!movieResults && <p>Loading....</p>}
      {movieNames.map((item, idx) => (
        <MovieList key={item + idx} title={item} movies={movieResults[idx]} />
      ))}
    </div>
  );
};

export default GPTSearchContainer;
