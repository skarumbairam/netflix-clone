import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    movieTrailerId: null,
    upcomingMovies: null,
    popularMovies: null,
    watchMovie: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopulaMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMovieTrailerId: (state, action) => {
      state.movieTrailerId = action.payload;
    },
    addWatchMovie: (state, action) => {
      state.watchMovie = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopulaMovies,
  addUpcomingMovies,
  addMovieTrailerId,
  addWatchMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
