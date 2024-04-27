import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: false,
  reducers: {
    setAlert: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
