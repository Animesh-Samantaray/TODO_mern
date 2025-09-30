import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;

      // Persist to localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;

      // Remove from localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
    },
  },
});

export const authActions = authSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
