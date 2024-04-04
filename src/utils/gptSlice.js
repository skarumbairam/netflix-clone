import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearch",
  initialState: false,
  reducers: {
    enableGptSearch: (state, action) => {
      return action.payload;
    },
  },
});

export default gptSlice.reducer;
export const { enableGptSearch } = gptSlice.actions;
