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

export default alertSlice.reducer;
export const { setAlert } = alertSlice.actions;
