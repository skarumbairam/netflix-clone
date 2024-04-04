import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieTrailerId: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addMovieTrailerId: (state, action) => {
      state.movieTrailerId = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addMovieTrailerId } = moviesSlice.actions;
export default moviesSlice.reducer;
