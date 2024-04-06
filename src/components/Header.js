import React, { useEffect } from "react";
import logo from "../assets/netflix_logo.png";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

// Store details
import { useDispatch, useSelector } from "react-redux";
import { enableGptSearch } from "../utils/gptSlice";
import { setLanguage } from "../utils/languageConfigSlice";
import { addUser, removeUser } from "../utils/userSlice";

import {
  addNowPlayingMovies,
  addPopulaMovies,
  addUpcomingMovies,
  addMovieTrailerId,
} from "../utils/moviesSlice";

import { SUPPORTED_LANGUAGES } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gptSearch.showGptSearch);

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful. Reset State
        /* dispatch(addNowPlayingMovies(null));
        dispatch(addPopulaMovies(null));
        dispatch(addUpcomingMovies(null));
        dispatch(addMovieTrailerId(null));*/
        navigate("/");
      })
      .catch((error) => {
        // An error happened. TODO Create Error Page
        navigate("/error");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
        // update user state in sotre
      } else {
        // User is signed out and navigate to login page
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const gptSearchHandler = () => {
    dispatch(enableGptSearch(!gptSearch));
  };

  const selectLanguageHandler = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <header className="text-white">
      <div className="px-0 md:px-8 py-2 bg-teal-950 z-10 relative md:flex items-center justify-between h-20 align-middle">
        <div className="flex items-center justify-center">
          <img className="w-40 md:w-44" src={logo} alt="logo" />
        </div>

        {userDetail && (
          <div className="flex items-center justify-between md:justify-normal bg-teal-950 md:bg-transparent p-4 md:pt:0 border-2 md:border-0 border-zinc-100">
            {gptSearch && (
              <select
                className="p-1 m-2 bg-gray-500 rounded-sm text-white"
                onChange={(e) => selectLanguageHandler(e)}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={gptSearchHandler}
              className="mx-5 md:mx-10 px-3 md:p-3 bg-red-500 rounded"
            >
              {gptSearch ? "Home" : "GPT Search"}
            </button>

            <p className="mx-2 text-white">
              👤
              <span className="hidden md:visible">
                {userDetail.displayName}
              </span>
            </p>

            <p
              onClick={logOutHandler}
              className="mx-2 px-6 text-white cursor-pointer"
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
