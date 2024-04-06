import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
  },

  reducers: {
    enableGptSearch: (state, action) => {
      state.showGptSearch = action.payload;
    },
    addGPTMovieResults: (state, actoion) => {
      const { movieResults, movieNames } = actoion.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export default gptSlice.reducer;
export const { enableGptSearch, addGPTMovieResults } = gptSlice.actions;
