import React, { useEffect } from "react";
import logo from "../assets/netflix_logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

// Store details
import { useDispatch, useSelector } from "react-redux";
import { enableGptSearch } from "../utils/gptSlice";
import { setLanguage } from "../utils/languageConfigSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetail = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gptSearch);

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened. TODO Create Error Page
        navigate("/error");
      });
  };

  const gptSearchHandler = () => {
    dispatch(enableGptSearch(!gptSearch));
  };

  const selectLanguageHandler = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <header className="text-white">
      <div className="px-8 py-2 bg-teal-950 z-10 relative flex justify-between h-20 align-middle">
        <div className="">
          <img className="w-44" src={logo} alt="logo" />
        </div>

        {userDetail && (
          <div className="flex items-center ">
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
              className="mx-10 p-3 bg-red-500 rounded"
            >
              {gptSearch ? "Back to Home" : "GPT Search"}
            </button>

            <p className="mx-2 text-white"> 👤 {userDetail.displayName}</p>

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
