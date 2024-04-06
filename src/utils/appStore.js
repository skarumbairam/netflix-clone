import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptSearchReducer from "./gptSlice";
import languageConfigReducer from "./languageConfigSlice";
import alertReducer from "./alertSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gptSearch: gptSearchReducer,
    langConfig: languageConfigReducer,
    alert: alertReducer,
  },
});

export default appStore;
