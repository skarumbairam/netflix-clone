import { createSlice } from "@reduxjs/toolkit";

const languageCongiSlice = createSlice({
  name: "langConfig",
  initialState: {
    language: "english",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageCongiSlice.actions;
export default languageCongiSlice.reducer;
