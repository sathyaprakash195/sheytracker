import { createSlice } from "@reduxjs/toolkit";

export const loadersSlice = createSlice({
  name: "loaders",
  initialState: {
    loading: false,
    buttonLoading: false,
  },
  reducers: {
    SetLoader: (state, action) => {
      state.loading = action.payload;
    },
    SetButtonLoader: (state, action) => {
      state.buttonLoading = action.payload;
    },
  },
});

export const { SetLoader , SetButtonLoader } = loadersSlice.actions;
