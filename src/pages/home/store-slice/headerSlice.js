import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
  activeLink: "home",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
});

export const { toggleMenu, setActiveLink } = headerSlice.actions;

export default headerSlice.reducer;
