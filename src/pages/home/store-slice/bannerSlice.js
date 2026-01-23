import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Salon quality nails in minutes",
  subtitle: "BUY 2 GET 1 FREE",
  isVisible: true,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSubtitle: (state, action) => {
      state.subtitle = action.payload;
    },
    toggleBanner: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { setTitle, setSubtitle, toggleBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
