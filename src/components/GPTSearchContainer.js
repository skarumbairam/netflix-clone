import React from "react";
import { useSelector } from "react-redux";
import languageConfig from "../utils/languageConfig";

const GPTSearchContainer = () => {
  return (
    <div className="container m-auto w-3/5">
      <SearchComponent />
      <ListComponent />
    </div>
  );
};

const SearchComponent = () => {
  const currLanguage = useSelector((store) => store.langConfig.language);
  console.log("Curr Langiuage", languageConfig[currLanguage].search);
  return (
    <div className="flex items-center justify-center mt-11">
      <div className="w-full flex bg-black p-2">
        <input
          className="p-4 m-2 rounded w-3/4"
          type="text"
          placeholder={languageConfig[currLanguage].placeholder}
        />
        <button className="w-1/4 m-2 p-4 bg-red-700 text-white rounded">
          {languageConfig[currLanguage].search}
        </button>
      </div>
    </div>
  );
};

const ListComponent = () => {
  return <div>ListComponent</div>;
};

export default GPTSearchContainer;
